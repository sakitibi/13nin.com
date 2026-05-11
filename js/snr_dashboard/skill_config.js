// キーと日本語名のマッピング
const SKILL_MAP = {
    "JINROU_SLASH": { name: "人狼: 切り裂く", default: 1 },
    "MAGICAL_GIRL_SLOW": { name: "魔法少女: 鈍足魔法", default: 1 },
    "MAGICAL_GIRL_POISON": { name: "魔法少女: 毒魔法", default: 1 },
    "MAGICAL_GIRL_FLY": { name: "魔法少女: 飛行魔法", default: 1 },
    "WANASHI_TRAP": { name: "罠師: 罠設置", default: 1 },
    "CRAB_BUBBLE": { name: "かに: かに化", default: 1 },
    "CRACKER_CRACK": { name: "クラッカー: クラック", default: 1 },
    "TELEPORTER_TELEPORT": { name: "テレポーター: テレポート", default: 1 },
    "URANAI_FORTUNE": { name: "占い師: 占い", default: 2 },
    "REINOU_REINOU": { name: "霊能者: 霊能", default: 1 },
    "HOANKAN_HUNTING": { name: "シェリフ: 正義執行", default: 1 },
    "KISHI_GUARD": { name: "騎士: 守護", default: 1 },
    "MAGICAL_BOY_SIGHT": { name: "魔法少年: 見通し魔法", default: 2 },
    "MAGICAL_BOY_FLY": { name: "魔法少年: 飛行魔法", default: 1 },
    "MAGICAL_BOY_TREATMENT": { name: "魔法少年: 治癒魔法", default: 1 },
    "NICETELEPORTER_TELEPORT": { name: "ナイステレポーター: テレポート", default: 1 },
    "SHINIGAMI_POSSESS": { name: "死神: 憑依", default: 1 },
    "CUPID_ARROW": { name: "キューピッド: 愛の矢", default: 1 }
};

const skillListContainer = document.getElementById('skill-list');

// 日本語表示用のカード生成
Object.keys(SKILL_MAP).forEach(key => {
    const item = SKILL_MAP[key];
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
        <div class="skill-info">
            <span class="skill-name-jp">${item.name}</span>
            <span class="skill-name-en">${key}</span>
        </div>
        <div class="skill-input-wrapper">
            <input type="number" id="input-${key}" value="${item.default}" min="1" max="5">
        </div>
    `;
    skillListContainer.appendChild(card);
});

async function handleRequest(method) {
    const log = document.getElementById('status-log');
    const configId = document.getElementById('config_id').value;
    const adminId = document.getElementById('admin_id').value;

    if (!configId || !adminId) {
        alert("IDと管理者UUIDを入力してください。");
        return;
    }

    const configData = {};
    Object.keys(SKILL_MAP).forEach(key => {
        configData[key] = parseInt(document.getElementById(`input-${key}`).value) || 0;
    });

    log.style.display = 'block';
    log.style.background = '#eee';
    log.innerText = "通信中...";

    try {
        const response = await fetch('https://asakura-wiki.vercel.app/api/snr2/skill_config', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-admin-id': adminId
            },
            body: JSON.stringify({
                config_id: configId,
                admin_id: adminId,
                config: configData
            })
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("last_config_id", configId);
            log.style.background = '#d4edda';
            log.innerText = `成功: 設定を${method === 'PUT' ? '更新' : '作成'}しました。`;
        } else {
            log.style.background = '#f8d7da';
            log.innerText = `エラー: ${result.error || '失敗しました'}`;
        }
    } catch (err) {
        log.style.background = '#f8d7da';
        log.innerText = "通信失敗: " + err.message;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('admin_id').value = localStorage.getItem("admin_id")
    document.getElementById('config_id').value = localStorage.getItem("config_id")
});