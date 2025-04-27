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
  selectedCell = cell;
  numberPicker.innerHTML = '';

  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => pickNumber(i);
    numberPicker.appendChild(btn);
  }

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'X';
  clearBtn.onclick = () => pickNumber('');
  numberPicker.appendChild(clearBtn);

  numberPicker.style.left = event.pageX + 'px';
  numberPicker.style.top = event.pageY + 'px';
  numberPicker.classList.remove('hidden');
}

function pickNumber(number) {
  if (selectedCell) {
    selectedCell.textContent = number;
    selectedCell = null;
  }
  numberPicker.classList.add('hidden');
}
