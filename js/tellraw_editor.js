    // これは読み込み用じゃ無いよ
    const el = (sel, p=document) => p.querySelector(sel)
    const els = (sel, p=document) => Array.from(p.querySelectorAll(sel))

    const kinds = {
      text: {
        title: 'テキスト',
        build: (ui) => {
          let t = ui.text.value
          const nl = ui.newline.value
          if(nl==='before') t = "\n" + t
          if(nl==='after') t = t + "\n"
          return { text: t }
        }
      },
      selector: {
        title: 'セレクタ',
        build: (ui) => ({ selector: ui.selector.value, ...(ui.separator.value ? { separator: ui.separator.value } : {}) })
      },
      score: {
        title: 'スコア',
        build: (ui) => ({ score: { name: ui.scoreName.value, objective: ui.scoreObj.value } })
      },
      translate: {
        title: '翻訳キー',
        build: (ui) => {
          const obj = { translate: ui.trKey.value }
          const withRaw = ui.trWith.value.trim()
          if(withRaw){
            // カンマ区切りで、各要素がJSONならJSON、そうでなければ文字列として扱う
            const parts = withRaw.split(',').map(s=>s.trim()).filter(Boolean).map(s=>{
              try{ return JSON.parse(s) }catch{ return { text: s } }
            })
            obj.with = parts
          }
          return obj
        }
      },
      keybind: {
        title: 'キーバインド',
        build: (ui) => ({ keybind: ui.kbKey.value })
      }
    }

    function createComp(kind='text'){
      const tpl = el('#tpl-comp')
      const node = tpl.content.firstElementChild.cloneNode(true)
      const title = el('h3', node)
      const kindSel = el('select.kind', node)
      const kindAreas = {
        text: el('[data-for="text"]', node),
        selector: el('[data-for="selector"]', node),
        score: el('[data-for="score"]', node),
        translate: el('[data-for="translate"]', node),
        keybind: el('[data-for="keybind"]', node),
      }
      const hoverAreas = {
        show_text: el('[data-hover="show_text"]', node),
        show_item: el('[data-hover="show_item"]', node),
        show_entity: el('[data-hover="show_entity"]', node),
      }
      const showKind = (k)=>{
        Object.keys(kindAreas).forEach(key=>{
          kindAreas[key].classList.toggle('hidden', key!==k)
        })
        title.textContent = kinds[k].title
      }
      const showHover = (h)=>{
        Object.keys(hoverAreas).forEach(key=>{
          hoverAreas[key].classList.toggle('hidden', key!==h)
        })
      }

      kindSel.value = kind
      showKind(kind)
      kindSel.addEventListener('change', ()=>{ showKind(kindSel.value); refresh() })
      el('.hoverAction', node).addEventListener('change', (e)=>{ showHover(e.target.value || 'none'); refresh() })

      // actions
      el('.btn-del', node).addEventListener('click', ()=>{ node.remove(); refresh() })
      el('.btn-up', node).addEventListener('click', ()=>{ const p=node.previousElementSibling; if(p) p.before(node); refresh() })
      el('.btn-down', node).addEventListener('click', ()=>{ const n=node.nextElementSibling; if(n) n.after(node); refresh() })

      // any change triggers refresh
      els('input,select,textarea', node).forEach(i=> i.addEventListener('input', refresh))

      return node
    }

    function readComp(node){
      const kind = el('.kind', node).value
      const builder = kinds[kind]
      const ui = {
        text: el('.text', node) || {value:''},
        newline: el('.newline', node) || {value:'no'},
        selector: el('.selector', node) || {value:''},
        separator: el('.separator', node) || {value:''},
        scoreName: el('.scoreName', node) || {value:''},
        scoreObj: el('.scoreObj', node) || {value:''},
        trKey: el('.trKey', node) || {value:''},
        trWith: el('.trWith', node) || {value:''},
        kbKey: el('.kbKey', node) || {value:''},

        colorPreset: el('.colorPreset', node),
        colorHex: el('.colorHex', node),
        fmts: els('.fmt', node),
        insertion: el('.insertion', node),
        clickAction: el('.clickAction', node),
        clickValue: el('.clickValue', node),
        hoverAction: el('.hoverAction', node),
        hoverText: el('.hoverText', node),
        hoverItemId: el('.hoverItemId', node),
        hoverItemCount: el('.hoverItemCount', node),
        hoverItemNbt: el('.hoverItemNbt', node),
        hoverEntityType: el('.hoverEntityType', node),
        hoverEntityId: el('.hoverEntityId', node),
        hoverEntityName: el('.hoverEntityName', node),
      }

      let obj = builder.build(ui)

      // color (1.21.8: プリセットまたは #RRGGBB)
      const hex = (ui.colorHex.value || '').trim()
      const preset = ui.colorPreset.value
      if(hex){ obj.color = hex }
      else if(preset){ obj.color = preset }

      // styling
      ui.fmts.forEach(chk=>{ if(chk.checked) obj[chk.dataset.k] = true })
      if(ui.insertion.value) obj.insertion = ui.insertion.value

      // clickEvent
      const ca = ui.clickAction.value
      const cv = ui.clickValue.value.trim()
      if(ca && cv){ obj.clickEvent = { action: ca, value: cv } }

      // hoverEvent (1.21.8)
      const ha = ui.hoverAction.value
      if(ha === 'show_text' && ui.hoverText.value){
        obj.hoverEvent = { action: 'show_text', contents: { text: ui.hoverText.value } }
      }
      if(ha === 'show_item' && (ui.hoverItemId.value || ui.hoverItemNbt.value)){
        const contents = { id: ui.hoverItemId.value || 'minecraft:stone' }
        const cnt = parseInt(ui.hoverItemCount.value,10)
        if(!isNaN(cnt) && cnt>0) contents.count = cnt
        const nbt = ui.hoverItemNbt.value.trim()
        if(nbt) contents.tag = nbt
        obj.hoverEvent = { action: 'show_item', contents }
      }
      if(ha === 'show_entity' && (ui.hoverEntityType.value || ui.hoverEntityId.value || ui.hoverEntityName.value)){
        const contents = {}
        if(ui.hoverEntityType.value) contents.type = ui.hoverEntityType.value
        if(ui.hoverEntityId.value) contents.id = ui.hoverEntityId.value
        if(ui.hoverEntityName.value){
          const raw = ui.hoverEntityName.value.trim()
          try{ contents.name = JSON.parse(raw) }catch{ contents.name = { text: raw } }
        }
        obj.hoverEvent = { action: 'show_entity', contents }
      }

      return obj
    }

    function buildJson(){
      const nodes = els('#components > .comp')
      return nodes.map(readComp)
    }

    function refresh(){
      const arr = buildJson()
      const target = el('#target').value || '@a'
      el('#jsonOut').textContent = JSON.stringify(arr, null, 2)
      el('#cmdOut').textContent = `/tellraw ${target} ` + JSON.stringify(arr)
      localStorage.setItem('tellraw_state_1218', JSON.stringify({target, arr}))
    }

    function add(kind='text'){
      const node = createComp(kind)
      el('#components').appendChild(node)
      // sensible defaults
      if(kind==='text') el('.text', node).value = 'テキスト'
      if(kind==='selector') el('.selector', node).value='@p'
      if(kind==='score') { el('.scoreName', node).value='@p'; el('.scoreObj', node).value='objective' }
      if(kind==='translate') { el('.trKey', node).value='chat.type.text'; el('.trWith', node).placeholder='{"text":"%s"}, {"text":"%s"}' }
      if(kind==='keybind') { el('.kbKey', node).value='key.jump' }
      refresh()
    }

    // controls
    el('#addText').addEventListener('click', ()=>add('text'))
    el('#addSelector').addEventListener('click', ()=>add('selector'))
    el('#addScore').addEventListener('click', ()=>add('score'))
    el('#addTranslate').addEventListener('click', ()=>add('translate'))
    el('#addKeybind').addEventListener('click', ()=>add('keybind'))

    el('#copyCmd').addEventListener('click', ()=>{
      const txt = el('#cmdOut').textContent
      navigator.clipboard.writeText(txt).then(()=>toast('コピーしました'))
    })
    el('#copyJson').addEventListener('click', ()=>{
      const txt = el('#jsonOut').textContent
      navigator.clipboard.writeText(txt).then(()=>toast('コピーしました'))
    })
    el('#exportJson').addEventListener('click', ()=>{
      const data = { target: el('#target').value, components: buildJson() }
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'})
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'tellraw-1.21.8.json'
      a.click()
    })
    el('#importJson').addEventListener('click', ()=>{
      const inp = document.createElement('input'); inp.type='file'; inp.accept='application/json'
      inp.onchange = () => {
        const f = inp.files[0]; if(!f) return
        f.text().then(txt=>{
          try{ const data = JSON.parse(txt); loadFromData(data) }catch{ toast('JSONの読み込みに失敗', true) }
        })
      }
      inp.click()
    })
    el('#clearAll').addEventListener('click', ()=>{ el('#components').innerHTML=''; refresh() })

    document.addEventListener('keydown', (e)=>{ if((e.ctrlKey||e.metaKey) && e.key==='Enter'){ refresh() } })

    function loadFromData(data){
      el('#components').innerHTML=''
      el('#target').value = data.target || '@a'
      const comps = data.components || []
      comps.forEach(c=>{
        // guess kind
        let kind='text'
        if('selector' in c) kind='selector'
        if('score' in c) kind='score'
        if('translate' in c) kind='translate'
        if('keybind' in c) kind='keybind'
        const node = createComp(kind)
        el('#components').appendChild(node)
        // common
        if(c.color) {
          if(/^#([0-9a-fA-F]{6})$/.test(c.color)) el('.colorHex', node).value = c.color
          else el('.colorPreset', node).value = c.color
        }
        ;['bold','italic','underlined','strikethrough','obfuscated'].forEach(k=>{ if(c[k]) el(`.fmt[data-k="${k}"]`, node).checked = true })
        if(c.insertion) el('.insertion', node).value = c.insertion
        if(c.clickEvent){ el('.clickAction', node).value = c.clickEvent.action; el('.clickValue', node).value = c.clickEvent.value }
        if(c.hoverEvent){
          const ha = c.hoverEvent.action; el('.hoverAction', node).value = ha
          // trigger UI reveal
          const evt = new Event('change'); el('.hoverAction', node).dispatchEvent(evt)
          const ct = c.hoverEvent.contents
          if(ha==='show_text'){ const t = (ct && (ct.text||ct)) || ''; el('.hoverText', node).value = typeof t==='string'? t : JSON.stringify(ct) }
          if(ha==='show_item'){ if(ct?.id) el('.hoverItemId', node).value = ct.id; if(ct?.count) el('.hoverItemCount', node).value = ct.count; if(ct?.tag) el('.hoverItemNbt', node).value = ct.tag }
          if(ha==='show_entity'){ if(ct?.type) el('.hoverEntityType', node).value = ct.type; if(ct?.id) el('.hoverEntityId', node).value = ct.id; if(ct?.name){ el('.hoverEntityName', node).value = typeof ct.name==='string'? ct.name : JSON.stringify(ct.name) } }
        }
        // kind specifics
        if(kind==='text'){ el('.text', node).value = c.text || '' }
        if(kind==='selector'){ el('.selector', node).value = c.selector || ''; if(c.separator) el('.separator', node).value = c.separator }
        if(kind==='score'){ el('.scoreName', node).value = c.score?.name || ''; el('.scoreObj', node).value = c.score?.objective || '' }
        if(kind==='translate'){ el('.trKey', node).value = c.translate || ''; if(Array.isArray(c.with)) el('.trWith', node).value = c.with.map(x=> typeof x==='string'? x : JSON.stringify(x)).join(', ') }
        if(kind==='keybind'){ el('.kbKey', node).value = c.keybind || '' }
      })
      refresh()
    }

    function toast(msg, isErr=false){
      const t = document.createElement('div')
      t.textContent = msg
      t.style.cssText = `position:fixed;bottom:18px;right:18px;background:${isErr?'#3a1620':'#143522'};border:1px solid ${isErr?'#ff6b6b':'#2ecc71'};padding:10px 14px;border-radius:12px;z-index:9999;opacity:.98`
      document.body.appendChild(t)
      setTimeout(()=>t.remove(), 1600)
    }

    // load last state
    try{
      const saved = JSON.parse(localStorage.getItem('tellraw_state_1218')||'null')
      if(saved){ loadFromData({target:saved.target, components:saved.arr}); }
      else{ add('text') }
    }catch{ add('text') }

    // first render
    refresh()
