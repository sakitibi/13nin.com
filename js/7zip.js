// これは読み込み用じゃ無いよ
/* ===========================
   LZMA Worker 初期化
=========================== */

// Worker 版 LZMA の正しい初期化
// Worker を自前で作る
const workerBlob = new Blob([
  `importScripts("/elibrary-api/js/b479c0cf-67c5-53f5-a493-0fe32e019261.min.js");`
], { type: "application/javascript" });

const workerURL = URL.createObjectURL(workerBlob);

// これで LZMA は constructor になる
const lzma = new LZMA(workerURL);

/* Base64 ⇄ Uint8Array */
function uint8ToBase64(u8) {
  const CHUNK = 0x8000;
  let index = 0;
  let result = '';
  while (index < u8.length) {
    result += String.fromCharCode.apply(null, u8.subarray(index, index + CHUNK));
    index += CHUNK;
  }
  return btoa(result);
}

function base64ToUint8(b64) {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
}

/* DOM */
const inputText = document.getElementById('inputText');
const btn7z = document.getElementById('btn7z');
const btn7zDownload = document.getElementById('btn7zDownload');
const outBase64 = document.getElementById('outBase64');
const inputSizeEl = document.getElementById('inputSize');
const compressedSizeEl = document.getElementById('compressedSize');
const levelSel = document.getElementById('level');

const sevenFileInput = document.getElementById('sevenFile');
const btnUn7zFile = document.getElementById('btnUn7zFile');
const btnUn7zFileDownload = document.getElementById('btnUn7zFileDownload');
const btnUn7zFromBase64 = document.getElementById('btnUn7zFromBase64');
const outText = document.getElementById('outText');

/* サイズ表示 */
function updateInputSize() {
  const size = new TextEncoder().encode(inputText.value).length;
  inputSizeEl.textContent = size;
}
updateInputSize();
inputText.addEventListener("input", updateInputSize);

/* ===========================
   LZMA 圧縮
=========================== */

function do7z(text, level = 6) {
  return new Promise((resolve, reject) => {
    lzma.compress(text, Number(level), (result, error) => {
      if (error) {
        console.error("do7zError:", error);
        reject(error);
        return;
      }
      resolve(new Uint8Array(result));
    });
  });
}

/* 圧縮 → Base64 表示 */
btn7z.addEventListener("click", async () => {
  try {
    const text = inputText.value;
    const level = levelSel.value;

    const compressed = await do7z(text, level);
    outBase64.value = uint8ToBase64(compressed);
    compressedSizeEl.textContent = compressed.length;
  } catch (e) {
    console.error(e);
  }
});

/* 圧縮 → ダウンロード */
btn7zDownload.addEventListener("click", async () => {
  try {
    const text = inputText.value;
    const level = levelSel.value;

    const compressed = await do7z(text, level);

    const blob = new Blob([compressed], { type: "application/x-lzma" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.lzma";
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 3000);
  } catch (e) {
    console.error(e);
  }
});

/* ===========================
   LZMA 解凍
=========================== */

let lastLoadedUint8 = null;

sevenFileInput.addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  lastLoadedUint8 = new Uint8Array(await f.arrayBuffer());
  alert("LZMA ファイルを読み込みました。");
});

// 解凍
function extract7z(u8) {
  return new Promise((resolve, reject) => {
    lzma.decompress(u8, (result, error) => {
      if (error) {
        console.error("extract7zError:", error);
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}

btnUn7zFile.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず LZMA ファイルを選択してください");

  outText.value = await extract7z(lastLoadedUint8);
});

btnUn7zFileDownload.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず LZMA ファイルを選択してください");

  const text = await extract7z(lastLoadedUint8);

  const blob = new Blob([text], { type: "text/plain; charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.txt";
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 3000);
});

btnUn7zFromBase64.addEventListener("click", async () => {
  const b64 = outBase64.value.trim();
  if (!b64) return alert("Base64 を入力してください");

  const u8 = base64ToUint8(b64);
  outText.value = await extract7z(u8);
});
