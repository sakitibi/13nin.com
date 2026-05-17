// 埋め込む時はtype="module"を忘れずに!
import {transpile, ScriptTarget} from "https://esm.sh/typescript@5.6.3?target=esnext";
import {minify} from "https://esm.sh/terser@5.36.0?target=esnext";

Uint8Array.prototype.toBase64 ??= function() {
    return btoa(Array.from(this, (v) => String.fromCharCode(v)).join(""));
}

for(const {type, textContent} of document.getElementsByTagName("script")) {
    if(type !== "text/typescript" || !textContent) {
        continue;
    }

    const js = transpile(textContent, {
        target: ScriptTarget.ESNext
    });

    const {code} = await minify(js, {
        module: true
    });

    await import(`data:text/javascript;base64,${new TextEncoder().encode(code).toBase64()}`);
}
