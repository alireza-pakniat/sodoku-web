/* عناصر اصلی */
const board        = document.getElementById('sudoku-board');
const numberPicker = document.getElementById('number-picker');
let   selectedCell = null;

/* ماتریس عددهای اولیه (۰ یعنی خانه خالی) */
const initialBoard = [
 [5,0,0,3,0,0,0,0,0],
 [0,0,0,0,7,0,0,0,0],
 [0,9,8,0,0,0,0,6,0],
 [8,0,0,0,6,0,0,0,3],
 [4,0,0,8,0,3,0,0,1],
 [7,0,0,0,2,0,0,0,6],
 [0,6,0,0,0,0,2,8,0],
 [0,0,0,4,1,9,0,0,5],
 [0,0,0,0,8,0,0,7,9]
];

/* ====== ساخت جدول ====== */
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

/* ====== نمایش منو ====== */
function openNumberPicker(e,cell){
  e.stopPropagation();

  if(selectedCell) selectedCell.classList.remove('selected');
  selectedCell=cell; selectedCell.classList.add('selected');

  /* ساخت دکمه‌ها از نو */
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

  /* موقعیت کنار سلول */
  const r=cell.getBoundingClientRect();
  numberPicker.style.left=`${r.right + window.scrollX + 5}px`;
  numberPicker.style.top =`${r.bottom+ window.scrollY + 5}px`;
  numberPicker.style.display='grid';      /* ⬅️ منو دیده شود */
}

/* ====== بستن منو (قطعی) ====== */
function closeNumberPicker(){
  numberPicker.style.display='none';      /* ⬅️ منو ناپدید شود */
  numberPicker.innerHTML='';              /* دکمه‌ها پاک شوند */
  if(selectedCell){
    selectedCell.classList.remove('selected');
    selectedCell=null;
  }
}

/* کلیک بیرونِ منو → بستن */
document.addEventListener('click',e=>{
  if(!numberPicker.contains(e.target)) closeNumberPicker();
});

/* ====== نوشتن عدد در سلول ====== */
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

/* ====== خطاهای ردیف/ستون/بلاک ====== */
function checkConflicts(){
  document.querySelectorAll('.cell').forEach(c=>c.classList.remove('error'));

  /* ردیف و ستون */
  for(let i=0;i<9;i++){
    const rowCount={}, colCount={};
    for(let j=0;j<9;j++){
      const rCell=document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
      const cCell=document.querySelector(`.cell[data-row="${j}"][data-col="${i}"]`);

      if(rCell.textContent){
        rowCount[rCell.textContent]=(rowCount[rCell.textContent]||[]).concat(rCell);
      }
      if(cCell.textContent){
        colCount[cCell.textContent]=(colCount[cCell.textContent]||[]).concat(cCell);
      }
    }
    Object.values(rowCount).forEach(arr=>{ if(arr.length>1) arr.forEach(c=>c.classList.add('error')); });
    Object.values(colCount).forEach(arr=>{ if(arr.length>1) arr.forEach(c=>c.classList.add('error')); });
  }

  /* بلاک ۳×۳ */
  for(let br=0;br<3;br++){
    for(let bc=0;bc<3;bc++){
      const valMap={};
      for(let r=br*3;r<br*3+3;r++){
        for(let c=bc*3;c<bc*3+3;c++){
          const cell=document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
          if(cell.textContent){
            valMap[cell.textContent]=(valMap[cell.textContent]||[]).concat(cell);
          }
        }
      }
      Object.values(valMap).forEach(arr=>{ if(arr.length>1) arr.forEach(c=>c.classList.add('error')); });
    }
  }
}

/* ====== بررسی برد ====== */
function checkWin(){
  const cells=[...document.querySelectorAll('.cell')];
  const allFilled=cells.every(c=>c.textContent!=='');
  const noError =cells.every(c=>!c.classList.contains('error'));

  if(allFilled && noError){
    board.style.background='#ccffcc';
    cells.forEach(c=>c.style.background='#ccffcc');
    setTimeout(()=>alert('🎉 Congratulations! Puzzle solved!'),150);
  }else{
    board.style.background='';
    cells.forEach(c=>{
      if(c.classList.contains('fixed')) c.style.background='#eee';
      else if(!c.classList.contains('error')) c.style.background='';
    });
  }
}
