// これは読み込み用じゃ無いよ
    const el = (sel, p=document) => p.querySelector(sel)
    const els = (sel, p=document) => Array.from(p.querySelectorAll(sel))
    const Url = new URL(window.location.href);
    const state = { comps: [] }
    const titleElement = el("title");
    const selectorContainer = el("#selector-container");
    const h1 = el("h1");
    const addSelector = el("#addSelector");
    const cmdOut = el("#cmdOut");
    const kinds = {
      text: {
        title: 'テキスト',
        build: (ui) => {
          let t = ui.text.value
          const nl = ui.newline.value
          if(nl==='before') t = "\n" + t
          if(nl==='after') t = t + "\n"
          const obj = { text: t }
          return obj
        }
      },
      selector: {
        title: 'セレクタ',
        build: (ui) => ({ selector: ui.selector.value, separator: '',
                           ...(ui.selPrefix.value ? { text: ui.selPrefix.value } : {}) // ignored by MC; placeholder to avoid empty
                         })
      },
      score: {
        title: 'スコア',
        build: (ui) => ({ score: { name: ui.scoreName.value, objective: ui.scoreObj.value } })
      }
    }
    if(localStorage.getItem("isnormal") === "true" && localStorage.getItem("issknewroles_ad") === "true"){
        localStorage.clear();
    }
    if(Url.searchParams.get("type") === "sknewroles_ad"){
        titleElement.innerText = "SKNewRoles広告に挿入するテキストを編集する";
        selectorContainer.style.display = "none";
        addSelector.style.display = "none";
        h1.innerText = "SKNewRoles広告に挿入するテキストを編集";
        cmdOut.innerText = "/tellraw @a[team=!Fusanka] []";
        el('#target').value = '@a[team=!Fusanka]';
        localStorage.setItem("issknewroles_ad", "true");
    } else {
        localStorage.setItem("isnormal", "true");
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
      }
      const showKind = (k)=>{
        Object.keys(kindAreas).forEach(key=>{
          kindAreas[key].classList.toggle('hidden', key!==k)
        })
        title.textContent = kinds[k].title
      }
      kindSel.value = kind
      showKind(kind)
      kindSel.addEventListener('change', ()=>showKind(kindSel.value))

      // actions
      el('.btn-del', node).addEventListener('click', ()=>{
        node.remove(); refresh()
      })
      el('.btn-up', node).addEventListener('click', ()=>{
        const prev = node.previousElementSibling
        if(prev) prev.before(node); refresh()
      })
      el('.btn-down', node).addEventListener('click', ()=>{
        const next = node.nextElementSibling
        if(next) next.after(node); refresh()
      })

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
        selPrefix: el('.selPrefix', node) || {value:''},
        scoreName: el('.scoreName', node) || {value:''},
        scoreObj: el('.scoreObj', node) || {value:''},
        color: el('.color', node),
        fmts: els('.fmt', node),
        insertion: el('.insertion', node),
        clickAction: el('.clickAction', node),
        clickValue: el('.clickValue', node),
        hoverText: el('.hoverText', node),
      }
      let obj = builder.build(ui)

      // styling
      const color = ui.color.value
      if(color) obj.color = color
      ui.fmts.forEach(chk=>{ if(chk.checked) obj[chk.dataset.k] = true })
      if(ui.insertion.value) obj.insertion = ui.insertion.value

      // clickEvent
      const ca = ui.clickAction.value
      const cv = ui.clickValue.value.trim()
      if(ca && cv){ obj.clickEvent = { action: ca, value: cv } }

      // hoverEvent (show_text)
      if(ui.hoverText.value){ obj.hoverEvent = { action: 'show_text', contents: { text: ui.hoverText.value } } }

      return obj
    }

    function buildJson(){
      const nodes = els('#components > .comp')
      const arr = nodes.map(readComp)
      return arr
    }

    function refresh(){
      const arr = buildJson()
      let target = el('#target').value || '@a';
      if(Url.searchParams.get("type") === "sknewroles_ad"){
          target = el('#target').value || '@a[team=!Fusanka]';
      } else {
          target = el('#target').value || '@a';
      }
      el('#jsonOut').textContent = JSON.stringify(arr, null, 2)
      el('#cmdOut').textContent = `/tellraw ${target} ` + JSON.stringify(arr)
      localStorage.setItem('tellraw_state', JSON.stringify({target, arr}))
    }

    function add(kind='text'){
      const node = createComp(kind)
      el('#components').appendChild(node)
      // sensible defaults
      if(kind==='text') el('.text', node).value = 'テキスト'
      if(kind==='selector') el('.selector', node).value='@p'
      if(kind==='score') { el('.scoreName', node).value='@p'; el('.scoreObj', node).value='objective' }
      refresh()
    }

    // controls
    el('#addText').addEventListener('click', ()=>add('text'))
    el('#addSelector').addEventListener('click', ()=>add('selector'))
    el('#addScore').addEventListener('click', ()=>add('score'))

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
      a.download = 'tellraw-1.19.4.json'
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
    el('#clearAll').addEventListener('click', ()=>{
      el('#components').innerHTML=''; refresh()
    })

    document.addEventListener('keydown', (e)=>{
      if((e.ctrlKey||e.metaKey) && e.key==='Enter'){ refresh() }
    })

    function loadFromData(data){
      el('#components').innerHTML=''
      if(Url.searchParams.get("type") === "sknewroles_ad"){
          el('#target').value = data.target || '@a[team=!Fusanka]';
      } else {
          el('#target').value = data.target || '@a';
      }
      const comps = data.components || []
      comps.forEach(c=>{
        // guess kind
        let kind='text'
        if('selector' in c) kind='selector'
        if('score' in c) kind='score'
        const node = createComp(kind)
        el('#components').appendChild(node)
        // fill common fields
        if(c.color) el('.color', node).value = c.color
        ;['bold','italic','underlined','strikethrough','obfuscated'].forEach(k=>{
          if(c[k]) el(`.fmt[data-k="${k}"]`, node).checked = true
        })
        if(c.insertion) el('.insertion', node).value = c.insertion
        if(c.clickEvent){ el('.clickAction', node).value = c.clickEvent.action; el('.clickValue', node).value = c.clickEvent.value }
        if(c.hoverEvent){ const hv = c.hoverEvent.contents?.text || ''; el('.hoverText', node).value = hv }
        // fill kind specifics
        if(kind==='text'){ el('.text', node).value = c.text || '' }
        if(kind==='selector'){ el('.selector', node).value = c.selector || '' }
        if(kind==='score'){ el('.scoreName', node).value = c.score?.name || ''; el('.scoreObj', node).value = c.score?.objective || '' }
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
      const saved = JSON.parse(localStorage.getItem('tellraw_state')||'null')
      if(saved){ loadFromData({target:saved.target, components:saved.arr}); }
      else{ add('text') }
    }catch{ add('text') }

    // first render
    refresh()
