// これは読み込み用じゃ無いよ

/* ===========================
   LZMA-JS 初期化
=========================== */

// LZMA-JS はグローバル LZMA をそのまま使う前提
// 非同期初期化は不要だが、存在チェックだけしておく
function ensureLzma() {
  if (typeof LZMA === "undefined") {
    throw new Error("LZMA-JS が読み込まれていません");
  }
}

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

function lzmaCompress(text, level = 6) {
  ensureLzma();
  return new Promise((resolve, reject) => {
    // LZMA.compress(入力, 圧縮レベル 0–9, コールバック, 進捗)
    LZMA.compress(text, Number(level), (result, error) => {
      if (error) {
        console.error("lzmaCompress error:", error);
        reject(error);
        return;
      }
      // result は Uint8Array か Array
      const u8 = result instanceof Uint8Array ? result : new Uint8Array(result);
      resolve(u8);
    });
  });
}

function lzmaDecompress(u8) {
  ensureLzma();
  return new Promise((resolve, reject) => {
    // Uint8Array / Array どちらでも OK
    const input = u8 instanceof Uint8Array ? u8 : new Uint8Array(u8);
    LZMA.decompress(input, (result, error) => {
      if (error) {
        console.error("lzmaDecompress error:", error);
        reject(error);
        return;
      }
      // result は文字列
      resolve(result);
    });
  });
}

// 旧 do7z を LZMA 用に差し替え（名前そのままでも良いならこのまま）
async function do7z(text, level = 6) {
  try {
    const compressed = await lzmaCompress(text, level);
    return compressed;
  } catch (e) {
    console.error("do7zError: ", e);
    return undefined;
  }
}

/* ボタンクリック: 圧縮して Base64 に表示 */
btn7z.addEventListener("click", async () => {
  const text = inputText.value;
  const level = levelSel.value;

  const compressed = await do7z(text, level);
  if (!compressed) return;

  outBase64.value = uint8ToBase64(compressed);
  compressedSizeEl.textContent = compressed.length;
});

/* ボタンクリック: 圧縮して .lzma としてダウンロード */
btn7zDownload.addEventListener("click", async () => {
  const text = inputText.value;
  const level = levelSel.value;

  const compressed = await do7z(text, level);
  if (!compressed) return;

  const blob = new Blob([compressed], { type: "application/x-lzma" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.lzma";
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 3000);
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

// 共通：解凍処理（旧 extract7z）
async function extract7z(u8) {
  const text = await lzmaDecompress(u8);
  return text;
}

btnUn7zFile.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず LZMA ファイルを選択してください");

  outText.value = await extract7z(lastLoadedUint8);
});

btnUn7zFileDownload.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず LZMA ファイルを選択してください");

  // LZMA で展開した “元データ” をバイナリとして保存したい場合
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
