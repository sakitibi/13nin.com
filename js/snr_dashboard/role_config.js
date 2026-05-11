async function sendData(method) {
    const consoleEl = document.getElementById('console');
    const configId = document.getElementById('config_id').value;
    const adminId = document.getElementById('admin_id').value;

    if (!configId || !adminId) {
        alert("IDと管理者パスワード(UUID)を入力してください。");
        return;
    }

    // 全ての役職IDをリスト化
    const roles = [
        'jinrouCount', 'kyoujinCount', 'kyoushinCount', 'magical_girlCount',
        'wanashiCount', 'crabCount', 'crackerCount', 'teleporterCount',
        'muraCount', 'uranaiCount', 'reinouCount', 'hoankanCount',
        'kishiCount', 'magical_boyCount', 'ponkotsuCount', 'kyouyuuCount',
        'niceteleporterCount', 'shinigamiCount', 'youkoCount', 'cupidCount'
    ];

    // configオブジェクトの作成
    const configData = {};
    roles.forEach(role => {
        configData[role] = Math.abs(parseInt(document.getElementById(role).value)) % 21 || 0;
    });

    const payload = {
        config_id: configId,
        admin_id: adminId,
        config: configData
    };

    consoleEl.style.display = 'block';
    consoleEl.style.background = '#eee';
    consoleEl.innerText = "通信中...";

    try {
        const response = await fetch('https://asakura-wiki.vercel.app/api/snr2/role_config', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-admin-id': adminId
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("last_config_id", configId);
            consoleEl.style.background = '#d4edda';
            consoleEl.innerText = `[${method}] 成功: ${JSON.stringify(result, null, 2)}`;
        } else {
            consoleEl.style.background = '#f8d7da';
            consoleEl.innerText = `[${method}] 失敗 (${response.status}): ${result.error || JSON.stringify(result)}`;
        }
    } catch (e) {
        consoleEl.style.background = '#f8d7da';
        consoleEl.innerText = `通信エラー: ${e.message}`;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('admin_id').value = localStorage.getItem("admin_id")
    document.getElementById('config_id').value = localStorage.getItem("config_id")
})