import brotliPromise from 'https://unpkg.com/brotli-wasm@3.0.1/index.web.js?module';

export async function decompressBrotli(compressedData) {
    // 1. 入力が Uint8Array かチェック（ArrayBufferだとここで失敗する）
    if (!(compressedData instanceof Uint8Array)) {
        console.warn("引数が Uint8Array ではありません。変換を試みます。");
        compressedData = new Uint8Array(compressedData);
    }

    // 2. データが空じゃないかチェック
    if (compressedData.length === 0) {
        throw new Error("解凍対象のデータが空です。");
    }

    const brotli = await brotliPromise;
    
    try {
        const decompressedData = brotli.decompress(compressedData);
        return new TextDecoder().decode(decompressedData);
    } catch (e) {
        // ここでエラーが出る場合、データがBrotli形式ではない、または壊れている
        console.error("Brotli解凍中に致命的なエラー:", e);
        console.log("データの先頭5バイト:", compressedData.slice(0, 5));
        throw e;
    }
}