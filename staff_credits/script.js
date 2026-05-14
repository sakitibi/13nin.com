import { decompressBrotli } from '../js/brotli.js';
import renderVirtualList from './renderVirtualList.js';

const url = new URL(window.location.href);
const loginParams = url.searchParams.get("login");

let isBot = true;
let res0 = { ok: false };
let isLogined = false;
let isAdmin = false;
let allStaffData = []; 
let filteredData = []; // 検索結果を含めた「現在表示すべき全データ」

if (typeof window === 'undefined') {
    isBot = true;
    return;
}

const ua = navigator.userAgent;
const bot = /(Googlebot|Google-InspectionTool|AdsBot-Google|bingbot|Slurp|DuckDuckBot|YandexBot|Baiduspider)/i.test(ua);
isBot = bot;

if (loginParams) {
    var headers = new Headers();
    headers.set("Authorization", `Bearer ${loginParams}`);
    const res = await fetch("https://asakura-wiki.vercel.app/api/accounts/login_check", {
        headers
    });
    const data = await res.json();
    isLogined = data.success;
    isAdmin = data.isAdmin;
}

if (isAdmin) {
    var headers = new Headers();
    headers.set("Authorization", loginParams);
    res0 = await fetch("https://asakura-wiki.vercel.app/api/staff_credits", {
        headers
    });
}
if (!isLogined && !isBot) {
    document.body.style.display = "block";
    document.body.style.textAlign = "center";
    document.body.innerHTML = `
    <h1>Error 401 unauthorized.</h1>
    <p><a href="https://asakura-wiki.vercel.app/login">認証して下さい。</a></p>
    `
}
if (res0.ok) {
    const data = await res0.arrayBuffer();
    const decompressed = await decompressBrotli(new Uint8Array(data));
    allStaffData = JSON.parse(decompressed);
} else {
    const [res1, res2, res3] = await Promise.all([
        fetch('staff_data_1_64.json.br'),
        fetch('staff_data_65_128.json.br'),
        fetch('staff_data_129_192.json.br')
    ]);

    if (!res1.ok || !res2.ok || !res3.ok) throw new Error("ファイルの取得に失敗しました");

    const [buf1, buf2, buf3] = await Promise.all([
        res1.arrayBuffer(),
        res2.arrayBuffer(),
        res3.arrayBuffer()
    ]);

    const jsonStr1 = await decompressBrotli(new Uint8Array(buf1));
    const jsonStr2 = await decompressBrotli(new Uint8Array(buf2));
    const jsonStr3 = await decompressBrotli(new Uint8Array(buf3));

    const data1 = JSON.parse(jsonStr1);
    const data2 = JSON.parse(jsonStr2);
    const data3 = JSON.parse(jsonStr3);
    
    allStaffData = [
        ...data1.staff_data,
        ...data2.staff_data,
        ...data3.staff_data
    ];
}

// --- 1. 詳細表示（必須 8項目 + オプション 3項目 + スタイル切り替え） ---
export const showDetail = (staff) => {
    const staffDetail = document.getElementById('staffDetail');
    const staffList = document.getElementById('staffList');

    // 前回のクラスが残らないよう一旦削除
    staffDetail.classList.remove('highlight-executive-detail');
    if (staff.dept === "総務部 部長" || staff.dept === "総務部 副部長") {
        staffDetail.classList.add('highlight-executive-detail');
    }

    // 【必須項目】の流し込み
    document.getElementById('detailId').textContent = staff.id;
    document.getElementById('detailName').textContent = staff.name;
    document.getElementById('detailKana').textContent = staff.kana;
    document.getElementById('detailDept').textContent = staff.dept;
    document.getElementById('detailLocation').textContent = staff.location;
    document.getElementById('detailSeat').textContent = staff.seat;
    document.getElementById('detailJoined').textContent = staff.joined;
    document.getElementById('detailTeam').textContent = staff.team;

    // 表示制御用サブ関数
    const setOptionalSection = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        const parent = el.closest('p'); 
        
        // 値が存在し、かつ空文字でない場合のみ表示
        if (value && String(value).trim() !== "") {
            el.textContent = value;
            if (parent) parent.style.display = 'block'; 
        } else {
            if (parent) parent.style.display = 'none';  
        }
    };

    // オプション項目の反映
    setOptionalSection('detailBirthday', staff.birthday);
    setOptionalSection('detailIntro', staff.intro);
    setOptionalSection('detailComment', staff.comment);

    staffDetail.style.display = 'block';
    // 詳細を開いたときはリストを隠す（UI上の配慮）
    staffList.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const staffList = document.getElementById('staffList');
    const staffListHidden = document.getElementById("staffList-hidden");
    const noResult = document.getElementById('noResult');
    const staffDetail = document.getElementById('staffDetail');
    const closeDetail = document.getElementById('closeDetail');

    // --- 3. データ読み込み (Brotli解凍処理) ---
    try {
        // Bot用隠しリストの生成
        if (staffListHidden) {
            allStaffData.forEach(staff => {
                const li = document.createElement("li");
                li.textContent = staff.name;
                staffListHidden.appendChild(li);
            });
        }

        filteredData = allStaffData;
        history.replaceState(
            {
                path: "https://sakitibi.github.io/13nin.com/staff_credits/"
            },
            "",
            "https://sakitibi.github.io/13nin.com/staff_credits/"
        );
    } catch (error) {
        console.error("データ読み込みエラー:", error);
    }

    // --- 4. スクロールイベント ---
    staffList.addEventListener('scroll', () => renderVirtualList(filteredData));

    // --- 5. 検索イベント ---
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        staffDetail.style.display = 'none';

        if (query === "") {
            filteredData = allStaffData;
        } else {
            filteredData = allStaffData.filter(staff => 
                staff.name.includes(query) || staff.kana.includes(query)
            );
        }

        if (filteredData.length === 0) {
            staffList.style.display = 'none';
            noResult.style.display = 'block';
        } else {
            noResult.style.display = 'none';
            staffList.style.display = 'block';
            staffList.scrollTop = 0;
            renderVirtualList(filteredData);
        }
    });

    // --- 6. フォーカス制御 ---
    searchInput.addEventListener('focus', () => {
        staffList.style.display = 'block';
        renderVirtualList(filteredData);
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            // 検索窓が空かつ詳細が開かれていない時だけリストを隠す
            if (searchInput.value.trim() === "" && staffDetail.style.display === 'none') {
                staffList.style.display = 'none';
                noResult.style.display = 'none';
            }
        }, 200);
    });

    if (closeDetail) {
        closeDetail.addEventListener('click', () => {
            staffDetail.style.display = 'none';
            // 詳細を閉じた時に検索文字が入っていればリストを再表示
            if (searchInput.value.trim() !== "") {
                staffList.style.display = 'block';
            }
        });
    }
});

// Botではない場合、隠しリストを削除する
setInterval(() => {
    const hiddenList = document.getElementById("staffList-hidden");
    if (!isBot && hiddenList) {
        hiddenList.remove();
    }
}, 50);