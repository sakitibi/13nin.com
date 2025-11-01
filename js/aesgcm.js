// これは読み込み用じゃ無いよ
const b64ToBuf = (b64) => Uint8Array.from(atob(b64), c=>c.charCodeAt(0));
const bufToB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

async function deriveKeyFromPassphrase(passphrase, salt, iterations, keyLen=256) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256'},
    baseKey,
    { name: 'AES-GCM', length: keyLen },
    false,
    ['encrypt','decrypt']
  );
}

function randomBytes(n){
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return a;
}

function generatedRandomPassphrase(){
  // simple random passphrase generator
  const words = ['sun','moon','river','mount','leaf','stone','blue','red','fast','silent','iron','glass','witch','magical','hypnosys','curse','devil'];
  let out = [];
  for(let i=0;i<4;i++) out.push(words[Math.floor(Math.random()*words.length)]);
  const output = out.join('-') + Math.floor(Math.random()*1000);
  passphrase.value = output;
  return output;
}

async function encryptText(plainText, passphrase, iterations, tagLength){
  const enc = new TextEncoder();
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = await deriveKeyFromPassphrase(passphrase, salt, iterations);
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, tagLength: tagLength },
    key,
    enc.encode(plainText)
  );
  return {
    salt: bufToB64(salt),
    iv: bufToB64(iv),
    iterations: iterations,
    tagLength: tagLength,
    ciphertext: bufToB64(ct)
  };
}

async function decryptObject(obj, passphrase){
  const dec = new TextDecoder();
  try{
    const salt = b64ToBuf(obj.salt);
    const iv = b64ToBuf(obj.iv);
    const iterations = Number(obj.iterations) || 100000;
    const tagLength = Number(obj.tagLength) || 128;
    const ct = b64ToBuf(obj.ciphertext).buffer;
    const key = await deriveKeyFromPassphrase(passphrase, salt, iterations);
    const plainBuf = await crypto.subtle.decrypt({name:'AES-GCM', iv, tagLength: tagLength}, key, ct);
    return dec.decode(plainBuf);
  }catch(e){
    throw new Error('復号に失敗しました: ' + e.message);
  }
}

// UI wiring
const inputText = document.getElementById('inputText');
const passphrase = document.getElementById('passphrase');
const iterationsInput = document.getElementById('iterations');
const tagLengthInput = document.getElementById('tagLength');
const output = document.getElementById('output');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const genKeyBtn = document.getElementById('genKeyBtn');

encryptBtn.addEventListener('click', async ()=>{
  output.textContent = '処理中...';
  try{
    const pass = passphrase.value || prompt('パスフレーズを入力してください（空の場合はキャンセル）');
    if(!pass){ output.textContent = 'キャンセルされました'; return; }
    const iters = Number(iterationsInput.value) || 100000;
    const tag = Number(tagLengthInput.value) || 128;
    const res = await encryptText(inputText.value, pass, iters, tag);
    output.textContent = JSON.stringify(res, null);
  }catch(e){ output.textContent = 'エラー: ' + e.message; }
});

decryptBtn.addEventListener('click', async ()=>{
  output.textContent = '処理中...';
  try{
    let parsed;
    try{ parsed = JSON.parse(inputText.value); }catch(e){ throw new Error('入力はJSONである必要があります'); }
    const pass = passphrase.value || generatedRandomPassphrase();
    if(!pass){ output.textContent = 'キャンセルされました'; return; }
    const plain = await decryptObject(parsed, pass);
    output.textContent = plain;
  }catch(e){ output.textContent = 'エラー: ' + e.message; }
});
genKeyBtn.addEventListener('click', generatedRandomPassphrase);
