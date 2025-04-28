const msg = document.getElementById('msg');
const board        = document.getElementById('sudoku-board');
const numberPicker = document.getElementById('number-picker');
let   selectedCell = null;

const initialBoard = [
 [5,3,0,0,7,0,0,0,0],
 [6,0,0,1,9,5,0,0,0],
 [0,9,8,0,0,0,0,6,0],
 [8,0,0,0,6,0,0,0,3],
 [4,0,0,8,0,3,0,0,1],
 [7,0,0,0,2,0,0,0,6],
 [0,6,0,0,0,0,2,8,0],
 [0,0,0,4,1,9,0,0,5],
 [0,0,0,0,8,0,0,7,9]
];

for(let r=0;r<9;r++){
  const rowDiv=document.createElement('div');
  rowDiv.classList.add('row');

  for(let c=0;c<9;c++){
    const cell=document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row=r; cell.dataset.col=c;

    if(initialBoard[r][c]!==0){
      cell.textContent=initialBoard[r][c];
      cell.classList.add('fixed');
    }else{
      cell.addEventListener('click',e=>openNumberPicker(e,cell));
    }
    rowDiv.appendChild(cell);
  }
  board.appendChild(rowDiv);
}

function openNumberPicker(e,cell){
  e.stopPropagation();

  if(selectedCell) selectedCell.classList.remove('selected');
  selectedCell=cell; selectedCell.classList.add('selected');

  numberPicker.innerHTML='';
  for(let i=1;i<=9;i++){
    const btn=document.createElement('button');
    btn.textContent=i;
    btn.onclick=()=>{ pickNumber(i); closeNumberPicker(); };
    numberPicker.appendChild(btn);
  }
  const clr=document.createElement('button');
  clr.textContent='X'; clr.classList.add('delete-btn');
  clr.onclick=()=>{ pickNumber(''); closeNumberPicker(); };
  numberPicker.appendChild(clr);


  const r=cell.getBoundingClientRect();
  numberPicker.style.left=`${r.right + window.scrollX + 5}px`;
  numberPicker.style.top =`${r.bottom+ window.scrollY + 5}px`;
  numberPicker.style.display='grid';     
}

function closeNumberPicker(){
  numberPicker.style.display='none';      
  numberPicker.innerHTML='';              
  if(selectedCell){
    selectedCell.classList.remove('selected');
    selectedCell=null;
  }
}

document.addEventListener('click',e=>{
  if(!numberPicker.contains(e.target)) closeNumberPicker();
});

function pickNumber(num){
  if(!selectedCell) return;

  selectedCell.textContent=num;
  if(num===''){
    selectedCell.classList.remove('user-input');
  }else if(!selectedCell.classList.contains('fixed')){
    selectedCell.classList.add('user-input');
  }
  selectedCell.classList.remove('selected');
  selectedCell=null;

  checkConflicts();
  checkWin();
}

function checkConflicts() {
  document.querySelectorAll('.cell').forEach(c => {
    c.classList.remove('error');
    c.style.background = c.classList.contains('fixed') ? '#eee' : '';
  });

  for (let i = 0; i < 9; i++) {
    const rowMap = {}, colMap = {};

    for (let j = 0; j < 9; j++) {
      const rCell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
      const cCell = document.querySelector(`.cell[data-row="${j}"][data-col="${i}"]`);

      if (rCell.textContent)
        (rowMap[rCell.textContent] = rowMap[rCell.textContent] || []).push(rCell);

      if (cCell.textContent)
        (colMap[cCell.textContent] = colMap[cCell.textContent] || []).push(cCell);
    }

    Object.values(rowMap).forEach(arr => markIfDuplicate(arr));
    Object.values(colMap).forEach(arr => markIfDuplicate(arr));
  }

  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const map = {};
      for (let r = br * 3; r < br * 3 + 3; r++) {
        for (let c = bc * 3; c < bc * 3 + 3; c++) {
          const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
          if (cell.textContent)
            (map[cell.textContent] = map[cell.textContent] || []).push(cell);
        }
      }
      Object.values(map).forEach(arr => markIfDuplicate(arr));
    }
  }
}

function markIfDuplicate(arr) {
  if (arr.length > 1) {
    arr.forEach(cell => {
      cell.classList.add('error');        
      cell.style.background = '#ffcccc';  
    });
  }
}

function checkWin(){
  const cells=[...document.querySelectorAll('.cell')];
  const allFilled=cells.every(c=>c.textContent!=='');
  const noError =cells.every(c=>!c.classList.contains('error'));

  if (allFilled && noError) {
    board.style.background = '#ccffcc';
    cells.forEach(c => c.style.background = '#ccffcc');
    msg.textContent = '🎉 Congratulations! Puzzle solved!';
    msg.classList.remove('hidden');
} else {
    board.style.background = '';
    msg.classList.add('hidden');
    cells.forEach(c => {
        if (c.classList.contains('error')) return;
        c.style.background = c.classList.contains('fixed') ? '#eee' : '';
    });
}
}
