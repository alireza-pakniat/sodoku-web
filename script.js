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

const numberPicker = document.getElementById('number-picker');
let selectedCell = null;

// وقتی روی یه سلول کلیک میشه
function selectCell(cell) {
    selectedCell = cell;
    showNumberPicker(cell);
}

// تابع نمایش منوی انتخاب عدد
function showNumberPicker(cell) {
    numberPicker.innerHTML = ''; // پاک کردن محتواهای قبلی

    // ساخت دکمه‌های ۱ تا ۹
    for (let i = 1; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.addEventListener('click', () => selectNumber(i));
        numberPicker.appendChild(btn);
    }

    // اضافه کردن دکمه پاک کردن
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'X';
    clearBtn.addEventListener('click', () => selectNumber(''));
    numberPicker.appendChild(clearBtn);

    // مکان قرارگیری منو نزدیک خانه کلیک شده
    const rect = cell.getBoundingClientRect();
    numberPicker.style.top = `${rect.bottom + window.scrollY + 5}px`;
    numberPicker.style.left = `${rect.left + window.scrollX}px`;
    numberPicker.classList.remove('hidden');
}

// تابع انتخاب عدد
function selectNumber(number) {
    if (selectedCell) {
        selectedCell.textContent = number;
    }
    numberPicker.classList.add('hidden'); // مخفی کردن منو بعد از انتخاب
}
