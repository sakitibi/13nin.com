// これは読み込み用じゃ無いよ
function uint8ToBase64(u8) {
  const CHUNK = 0x8000; // chunk size
  let index = 0;
  const length = u8.length;
  let result = '';
  while (index < length) {
    const slice = u8.subarray(index, Math.min(index + CHUNK, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK;
  }
  return btoa(result);
}

// Base64 -> Uint8Array
function base64ToUint8(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const u8 = new Uint8Array(len);
  for (let i = 0; i < len; i++) u8[i] = binary.charCodeAt(i);
  return u8;
}

// DOM
const inputText = document.getElementById('inputText');
const btnGzip = document.getElementById('btnGzip');
const btnGzipDownload = document.getElementById('btnGzipDownload');
const outBase64 = document.getElementById('outBase64');
const inputSizeEl = document.getElementById('inputSize');
const compressedSizeEl = document.getElementById('compressedSize');
const levelSelect = document.getElementById('level');

const gzipFileInput = document.getElementById('gzipFile');
const btnUngzipFile = document.getElementById('btnUngzipFile');
const btnUngzipFileDownload = document.getElementById('btnUngzipFileAndDownload');
const btnUngzipFromBase64 = document.getElementById('btnUngzipFromBase64');
const outText = document.getElementById('outText');

function updateInputSize() {
  const bytes = new TextEncoder().encode(inputText.value).length;
  inputSizeEl.textContent = bytes;
}
updateInputSize();
inputText.addEventListener('input', updateInputSize);

// 圧縮処理
function doGzip(text, level = 6) {
  // pako.gzip は文字列を受け取って Uint8Array を返す
  const opts = { level: Number(level) };
  try {
    return pako.gzip(text, opts);
  } catch (e) {
    alert('gzip でエラー: ' + e.message);
    throw e;
  }
}

// ungzip（Uint8Array -> string）
function doUngzip(u8) {
  try {
    return pako.ungzip(u8, { to: 'string' });
  } catch (e) {
    // pako のエラーをそのまま表示
    alert('ungzip でエラー: ' + e.message);
    throw e;
  }
}

btnGzip.addEventListener('click', () => {
  const text = inputText.value;
  const level = levelSelect.value;
  const compressed = doGzip(text, level);
  outBase64.value = uint8ToBase64(compressed);
  compressedSizeEl.textContent = compressed.length;
});

btnGzipDownload.addEventListener('click', () => {
  const text = inputText.value;
  const level = levelSelect.value;
  const compressed = doGzip(text, level);
  compressedSizeEl.textContent = compressed.length;

  const blob = new Blob([compressed], { type: 'application/gzip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.txt.gz';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
});

// .gz ファイルを読み込む（File input）
let lastLoadedUint8 = null;
gzipFileInput.addEventListener('change', (e) => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    const ab = reader.result;
    lastLoadedUint8 = new Uint8Array(ab);
    alert('.gz を読み込みました。ボタンで展開できます。');
  };
  reader.onerror = () => alert('ファイル読み込みエラー');
  reader.readAsArrayBuffer(f);
});

btnUngzipFile.addEventListener('click', () => {
  if (!lastLoadedUint8) return alert('まず .gz ファイルを選択してください');
  const text = doUngzip(lastLoadedUint8);
  outText.value = text;
});

btnUngzipFileDownload.addEventListener('click', () => {
  if (!lastLoadedUint8) return alert('まず .gz ファイルを選択してください');
  const text = doUngzip(lastLoadedUint8);
  const bytes = new TextEncoder().encode(text);
  const blob = new Blob([bytes], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'rawdata.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
});

btnUngzipFromBase64.addEventListener('click', () => {
  const b64 = outBase64.value.trim();
  if (!b64) return alert('まず Base64 を用意してください（圧縮結果をコピーして貼り付けるか、上の圧縮で生成してください）');
  const u8 = base64ToUint8(b64);
  const text = doUngzip(u8);
  outText.value = text;
});

// 任意: ペーストで Base64 を自動展開する小機能
outBase64.addEventListener('paste', () => setTimeout(() => {
  // 遅延して貼り付けられた内容を読む
  const b64 = outBase64.value.trim();
  if (b64) {
    try {
      const u8 = base64ToUint8(b64);
      const txt = pako.ungzip(u8, { to: 'string' });
      outText.value = txt;
    } catch (e) {
      console.error("Error: ", e);
    }
  }
}, 50));
