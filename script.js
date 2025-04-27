const board = document.getElementById('sudoku-board');
const numberPicker = document.getElementById('number-picker');
let selectedCell = null;

// آرایه عددهای اولیه سودوکو
const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// ساخت جدول ۹×۹
for (let row = 0; row < 9; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        if (initialBoard[row][col] !== 0) {
            cell.textContent = initialBoard[row][col];
            cell.classList.add('fixed');
        } else {
            cell.addEventListener('click', (event) => openNumberPicker(event, cell));
        }

        rowDiv.appendChild(cell);
    }

    board.appendChild(rowDiv);
}

// باز کردن منوی انتخاب عدد
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
            closeNumberPicker();
        };
        numberPicker.appendChild(btn);
    }

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'X';
    clearBtn.classList.add('delete-btn');
    clearBtn.onclick = (e) => {
        e.stopPropagation();
        pickNumber('');
        closeNumberPicker();
    };
    numberPicker.appendChild(clearBtn);

    const rect = cell.getBoundingClientRect();
    numberPicker.style.left = (rect.right + window.scrollX + 5) + 'px';
    numberPicker.style.top = (rect.bottom + window.scrollY + 5) + 'px';

    numberPicker.classList.remove('hidden');
}

// انتخاب عدد یا حذف
function pickNumber(number) {
  if (selectedCell) {
      selectedCell.textContent = number;
      selectedCell.classList.remove('selected');
      selectedCell = null;
  }
  checkConflicts();
  checkWin();
}


// بستن number-picker
function closeNumberPicker() {
    numberPicker.classList.add('hidden');
}

function checkConflicts() {
  // پاک کردن خطاهای قبلی
  document.querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('error');
  });

  const cells = document.querySelectorAll('.cell');

  // چک کردن تکرار در ردیف‌ها و ستون‌ها
  for (let row = 0; row < 9; row++) {
      const rowValues = {};
      const colValues = {};

      for (let col = 0; col < 9; col++) {
          const rowCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
          const colCell = document.querySelector(`.cell[data-row="${col}"][data-col="${row}"]`);

          // چک ردیف
          if (rowCell.textContent !== '') {
              if (rowValues[rowCell.textContent]) {
                  rowValues[rowCell.textContent].push(rowCell);
              } else {
                  rowValues[rowCell.textContent] = [rowCell];
              }
          }

          // چک ستون
          if (colCell.textContent !== '') {
              if (colValues[colCell.textContent]) {
                  colValues[colCell.textContent].push(colCell);
              } else {
                  colValues[colCell.textContent] = [colCell];
              }
          }
      }

      for (const value in rowValues) {
          if (rowValues[value].length > 1) {
              rowValues[value].forEach(cell => cell.classList.add('error'));
          }
      }

      for (const value in colValues) {
          if (colValues[value].length > 1) {
              colValues[value].forEach(cell => cell.classList.add('error'));
          }
      }
  }

  for (let blockRow = 0; blockRow < 3; blockRow++) {
      for (let blockCol = 0; blockCol < 3; blockCol++) {
          const blockValues = {};

          for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
              for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
                  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

                  if (cell.textContent !== '') {
                      if (blockValues[cell.textContent]) {
                          blockValues[cell.textContent].push(cell);
                      } else {
                          blockValues[cell.textContent] = [cell];
                      }
                  }
              }
          }

          for (const value in blockValues) {
              if (blockValues[value].length > 1) {
                  blockValues[value].forEach(cell => cell.classList.add('error'));
              }
          }
      }
  }
}

function checkWin() {
  const cells = document.querySelectorAll('.cell');
  let allFilled = true;
  let anyError = false;

  cells.forEach(cell => {
      if (cell.textContent === '') {
          allFilled = false;
      }
      if (cell.classList.contains('error')) {
          anyError = true;
      }
  });

  const board = document.getElementById('sudoku-board');

  if (allFilled && !anyError) {
      board.style.backgroundColor = '#ccffcc'; // پس زمینه کل جدول سبز
      // همه سلول‌ها هم پس‌زمینه‌شون سبز بشه
      cells.forEach(cell => {
          cell.style.backgroundColor = '#ccffcc';
      });
  } else {
      board.style.backgroundColor = ''; // برگرداندن حالت عادی
      // فقط سلول‌های غیرثابت پس زمینه‌شون عادی بشه
      cells.forEach(cell => {
          if (!cell.classList.contains('fixed')) {
              cell.style.backgroundColor = '';
          } else {
              cell.style.backgroundColor = '#eee'; // خونه ثابت‌ها برگرده به خاکستری
          }
      });
  }
}
