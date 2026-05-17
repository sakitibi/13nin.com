const ITEMS_MAP = {
    "breadPrice": { name: "焼きたてのパン", def: 1 },
    "wornSwordPrice": { name: "ボロい剣", def: 5 },
    "goodSwordPrice": { name: "良い剣", def: 5 },
    "sturdyBowPrice": { name: "頑丈な弓", def: 5 },
    "arrowPrice": { name: "普通の弓矢", def: 1 },
    "smokeBombPrice": { name: "煙玉", def: 3 },
    "tntBombPrice": { name: "手投げ爆弾", def: 5 },
    "blindnessToolPrice": { name: "盲目付与ツール", def: 5 },
    "glowingToolPrice": { name: "発光ツール", def: 5 },
    "fireMagicWandPrice": { name: "炎の魔法の杖", def: 7 },
    "iceMagicWandPrice": { name: "氷の魔法の杖", def: 7 },
    "thunderMagicWandPrice": { name: "雷の魔法の杖", def: 10 },
    "healingMagicWandPrice": { name: "回復の魔法の杖", def: 7 },
    "curseMagicWandPrice": { name: "呪いの魔法の杖", def: 13 },
    "invisibleMagicWandPrice": { name: "透明化の魔法の杖", def: 7 }
};

const container = document.getElementById('item-list');
Object.keys(ITEMS_MAP).forEach(key => {
    container.innerHTML += `
        <div class="item-card">
            <span class="item-name">${ITEMS_MAP[key].name}</span>
            <div class="item-input-wrapper">
                <input type="number" id="input-${key}" value="${ITEMS_MAP[key].def}" min="1" max="20">
            </div>
        </div>
    `;
});

async function handleRequest(method) {
    const log = document.getElementById('status-log');
    const configId = document.getElementById('config_id').value;
    const adminId = document.getElementById('admin_id').value;
    if (!configId || !adminId) return alert("IDを入力してください");

    const config = {};
    Object.keys(ITEMS_MAP).forEach(key => {
        config[key] = parseInt(document.getElementById(`input-${key}`).value) || 0;
    });

    log.style.display = 'block';
    log.innerText = "通信中...";

    try {
        const res = await fetch('https://asakura-wiki.vercel.app/api/snr2/shop_config', {
            method: method,
            headers: { 'Content-Type': 'application/json', 'x-admin-id': adminId },
            body: JSON.stringify({ config_id: configId, admin_id: adminId, config })
        });
        const result = await res.json();
        if (res.ok) localStorage.setItem("last_config_id", configId);
        log.style.background = res.ok ? '#d4edda' : '#f8d7da';
        log.innerText = res.ok ? `成功: 設定を${method === 'PUT' ? '更新' : '保存'}しました。` : `エラー: ${result.error}`;
    } catch (e) {
        log.style.background = '#f8d7da';
        log.innerText = "通信失敗: " + e.message;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('admin_id').value = localStorage.getItem("admin_id")
    document.getElementById('config_id').value = localStorage.getItem("config_id")
})