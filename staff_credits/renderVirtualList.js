import { showDetail } from './script.js';

// --- 2. 仮想リスト描画ロジック ---
export default function renderVirtualList(filteredData) {
    const ITEM_HEIGHT = 50; // CSSの.staff-itemの高さと合わせる
    const VISIBLE_RANGE = 4; // 真ん中から上下に表示する個数
    const staffList = document.getElementById('staffList'); // 要素を明示的に取得
    
    if (!staffList) return;

    const scrollTop = staffList.scrollTop;
    const containerHeight = staffList.clientHeight;
    const centerIndex = Math.floor((scrollTop + containerHeight / 2) / ITEM_HEIGHT);
    
    let startIndex = Math.max(0, centerIndex - VISIBLE_RANGE);
    let endIndex = Math.min(filteredData.length, centerIndex + VISIBLE_RANGE + 1);

    const paddingTop = startIndex * ITEM_HEIGHT;
    const paddingBottom = (filteredData.length - endIndex) * ITEM_HEIGHT;
    const visibleData = filteredData.slice(startIndex, endIndex);
    
    staffList.innerHTML = '';
    
    const spacerTop = document.createElement('div');
    spacerTop.style.height = `${paddingTop}px`;
    staffList.appendChild(spacerTop);

    visibleData.forEach((staff) => {
        const li = document.createElement('li');
        li.className = 'staff-item';
        
        if (staff.dept === "総務部 部長" || staff.dept === "総務部 副部長") {
            li.classList.add('highlight-executive');
        }

        li.style.height = `${ITEM_HEIGHT}px`;
        li.innerHTML = `
            <span>${staff.name}</span>
            <span class="id-tag">${staff.id}</span>
        `;
        li.addEventListener('click', () => {
            showDetail(staff);
        });
        staffList.appendChild(li);
    });

    const spacerBottom = document.createElement('div');
    spacerBottom.style.height = `${paddingBottom}px`;
    staffList.appendChild(spacerBottom);
};