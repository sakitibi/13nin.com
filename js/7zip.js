// これは読み込み用じゃ無いよ
let seven = null;

// WASM 初期化（UMD版）
async function init7z() {
  if (!seven) {
    seven = await SevenZip();
    await seven.loadWasm("https://cdn.jsdelivr.net/npm/7z-wasm@latest/7zz.wasm");
  }
}
init7z();

// Base64 <-> Uint8Array
function uint8ToBase64(u8) {
  const CHUNK = 0x8000;
  let index = 0;
  let result = '';
  while (index < u8.length) {
    const slice = u8.subarray(index, index + CHUNK);
    result += String.fromCharCode.apply(null, slice);
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

// DOM
const inputText = document.getElementById('inputText');
const btn7z = document.getElementById('btn7z');
const btn7zDownload = document.getElementById('btn7zDownload');
const outBase64 = document.getElementById('outBase64');
const inputSizeEl = document.getElementById('inputSize');
const compressedSizeEl = document.getElementById('compressedSize');
const levelSelect = document.getElementById('level');

const sevenFileInput = document.getElementById('sevenFile');
const btnUn7zFile = document.getElementById('btnUn7zFile');
const btnUn7zFileDownload = document.getElementById('btnUn7zFileDownload');
const btnUn7zFromBase64 = document.getElementById('btnUn7zFromBase64');
const outText = document.getElementById('outText');

// サイズ計算
function updateInputSize() {
  const bytes = new TextEncoder().encode(inputText.value).length;
  inputSizeEl.textContent = bytes;
}
updateInputSize();
inputText.addEventListener('input', updateInputSize);

// ---------- 圧縮 （7z） ----------
async function do7z(text, level = 6) {
  await init7z();

  // 仮想 FS を初期化
  seven.FS.writeFile("data.txt", new TextEncoder().encode(text));

  // 7z 圧縮コマンド
  seven.callMain([
    "a",
    "-t7z",
    `-mx=${level}`,
    "out.7z",
    "data.txt"
  ]);

  const bytes = seven.FS.readFile("out.7z");

  // FSの掃除
  seven.FS.unlink("data.txt");
  seven.FS.unlink("out.7z");

  return bytes;
}

btn7z.addEventListener('click', async () => {
  const text = inputText.value;
  const level = levelSelect.value;

  const compressed = await do7z(text, level);
  outBase64.value = uint8ToBase64(compressed);
  compressedSizeEl.textContent = compressed.length;
});

btn7zDownload.addEventListener('click', async () => {
  const text = inputText.value;
  const level = levelSelect.value;

  const compressed = await do7z(text, level);

  const blob = new Blob([compressed], { type: "application/x-7z-compressed" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.7z";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
});

// ---------- 解凍 （7z） ----------
let lastLoadedUint8 = null;

sevenFileInput.addEventListener('change', async (e) => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;

  const ab = await f.arrayBuffer();
  lastLoadedUint8 = new Uint8Array(ab);

  alert(".7z ファイルを読み込みました。");
});

async function extract7z(u8) {
  await init7z();

  seven.FS.writeFile("in.7z", u8);

  seven.callMain(["x", "in.7z", "-y"]);

  // 展開された最初のファイルを探す
  const list = seven.FS.readdir(".");
  const realFiles = list.filter(f => f !== "." && f !== ".." && f !== "in.7z");

  if (realFiles.length === 0) return "";

  const first = realFiles[0];
  const bytes = seven.FS.readFile(first);

  seven.FS.unlink("in.7z");
  seven.FS.unlink(first);

  return new TextDecoder().decode(bytes);
}

btnUn7zFile.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず .7z ファイルを選択してください");

  const text = await extract7z(lastLoadedUint8);
  outText.value = text;
});

btnUn7zFileDownload.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず .7z ファイルを選択してください");

  await init7z();

  seven.FS.writeFile("in.7z", lastLoadedUint8);
  seven.callMain(["x", "in.7z", "-y"]);

  const list = seven.FS.readdir(".");
  const files = list.filter(f => f !== "." && f !== ".." && f !== "in.7z");

  const first = files[0];
  const bytes = seven.FS.readFile(first);

  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = first;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 3000);

  seven.FS.unlink("in.7z");
  seven.FS.unlink(first);
});

btnUn7zFromBase64.addEventListener("click", async () => {
  const b64 = outBase64.value.trim();
  if (!b64) return alert("Base64 を入力してください");

  const u8 = base64ToUint8(b64);
  const text = await extract7z(u8);

  outText.value = text;
});
