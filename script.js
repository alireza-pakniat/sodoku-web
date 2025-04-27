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
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', (event) => openNumberPicker(event, cell));
        rowDiv.appendChild(cell);
    }

    board.appendChild(rowDiv);
}

function openNumberPicker(event, cell) {
    event.stopPropagation();

    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }

    selectedCell = cell;
    selectedCell.classList.add('selected');

    numberPicker.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = (e) => {
            e.stopPropagation();
            pickNumber(i);
        };
        numberPicker.appendChild(btn);
    }

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'X';
    clearBtn.classList.add('delete-btn');
    clearBtn.onclick = (e) => {
        e.stopPropagation();
        pickNumber('');
    };
    numberPicker.appendChild(clearBtn);

    const rect = cell.getBoundingClientRect();
    numberPicker.style.left = (rect.right + window.scrollX + 5) + 'px';
    numberPicker.style.top = (rect.bottom + window.scrollY + 5) + 'px';

    numberPicker.classList.remove('hidden');
}

// وقتی روی عدد یا ضربدر کلیک میشه
function pickNumber(number) {
    if (selectedCell) {
        selectedCell.textContent = number;
        selectedCell.classList.remove('selected');
        selectedCell = null;
    }
    updateNumberPickerVisibility();
}

// تابع آپدیت نمایش یا عدم نمایش number-picker
function updateNumberPickerVisibility() {
    if (selectedCell && selectedCell.classList.contains('selected')) {
        numberPicker.classList.remove('hidden');
    } else {
        numberPicker.classList.add('hidden');
    }
}
