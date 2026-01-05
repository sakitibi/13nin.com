// これは読み込み用じゃ無いよ
/* ===========================
   7z-wasm 初期化
=========================== */
let seven = null;

async function init7z() {
   seven = await SevenZip();
}
init7z();

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
   7z 圧縮
=========================== */
async function do7z(text, level = 6) {
  await init7z();

  seven.FS.writeFile("data.txt", new TextEncoder().encode(text));

  seven.callMain(["a", "-t7z", "-spf-", `-mx=${level}`, "out.7z", "data.txt"]);

  const bytes = seven.FS.readFile("out.7z");

  seven.FS.unlink("data.txt");
  seven.FS.unlink("out.7z");

  return bytes;
}

btn7z.addEventListener("click", async () => {
  const text = inputText.value;
  const level = levelSel.value;

  const compressed = await do7z(text, level);
  outBase64.value = uint8ToBase64(compressed);
  compressedSizeEl.textContent = compressed.length;
});

btn7zDownload.addEventListener("click", async () => {
  const text = inputText.value;
  const level = levelSel.value;

  const compressed = await do7z(text, level);

  const blob = new Blob([compressed], { type: "application/x-7z-compressed" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.7z";
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 3000);
});

/* ===========================
   7z 解凍
=========================== */
let lastLoadedUint8 = null;

sevenFileInput.addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  lastLoadedUint8 = new Uint8Array(await f.arrayBuffer());
  alert("7z ファイルを読み込みました。");
});

// 共通：解凍処理
async function extract7z(u8) {
  await init7z();

  seven.FS.writeFile("in.7z", u8);
  seven.callMain(["x", "in.7z", "-y"]);

  const list = seven.FS.readdir(".");
  const files = list.filter(f => f !== "." && f !== ".." && f !== "in.7z");

  if (files.length === 0) return "";

  const first = files[0];
  const bytes = seven.FS.readFile(first);

  seven.FS.unlink("in.7z");
  seven.FS.unlink(first);

  return new TextDecoder().decode(bytes);
}

btnUn7zFile.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず 7z ファイルを選択してください");

  outText.value = await extract7z(lastLoadedUint8);
});

btnUn7zFileDownload.addEventListener("click", async () => {
  if (!lastLoadedUint8) return alert("まず 7z ファイルを選択してください");

  await init7z();

  seven.FS.writeFile("in.7z", lastLoadedUint8);
  seven.callMain(["x", "in.7z", "-y"]);

  const list = seven.FS.readdir(".");
  const files = list.filter(f => f !== "." && f !== ".." && f !== "in.7z");

  const first = files[0];
  const data = seven.FS.readFile(first);

  const blob = new Blob([data], { type: "application/octet-stream" });
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

  outText.value = await extract7z(base64ToUint8(b64));
});
