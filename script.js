// دسترسی به المنتی که باید جدول داخلش ساخته بشه
const board = document.getElementById('sudoku-board');

// ساخت جدول ۹×۹
for (let row = 0; row < 9; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);
        cell.addEventListener('click', () => selectCell(cell));
        rowDiv.appendChild(cell);
    }

    board.appendChild(rowDiv);
}

// تابع کلیک روی خانه
function selectCell(cell) {
    console.log(`Cell clicked: Row ${cell.dataset.row}, Col ${cell.dataset.col}`);
    // بعدا اینجا باز شدن پنجره انتخاب عدد رو هم اضافه می‌کنیم
}
