const board = document.getElementById('sudoku-board');
const numberPicker = document.getElementById('number-picker');
let selectedCell = null;

// ساخت جدول ۹×۹
for (let row = 0; row < 9; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);
        cell.addEventListener('click', (event) => selectCell(cell, event));
        rowDiv.appendChild(cell);
    }

    board.appendChild(rowDiv);
}

// وقتی روی سلول کلیک میشه
function selectCell(cell, event) {
    selectedCell = cell;
    showNumberPicker(event.pageX, event.pageY);
}

// نمایش منوی انتخاب عدد
function showNumberPicker(x, y) {
    numberPicker.innerHTML = ''; // پاک کردن محتوا قبلی

    // ساخت دکمه‌های ۱ تا ۹
    for (let i = 1; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.addEventListener('click', () => selectNumber(i));
        numberPicker.appendChild(btn);
    }

    // دکمه پاک کردن
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'X';
    clearBtn.addEventListener('click', () => selectNumber(''));
    numberPicker.appendChild(clearBtn);

    // تنظیم مکان منو کنار ماوس
    numberPicker.style.top = `${y}px`;
    numberPicker.style.left = `${x}px`;
    numberPicker.classList.remove('hidden');
}

// انتخاب عدد
function selectNumber(number) {
    if (selectedCell) {
        selectedCell.textContent = number;
    }
    numberPicker.classList.add('hidden'); // بستن منو بعد از انتخاب
}
