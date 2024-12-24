// Required Variables
const duration = 100,
  startPage = document.getElementById("startPage"),
  startButton = document.getElementById("startButton"),
  container_grid = document.getElementById("container-grid"),
  gridSize = document.getElementById("gridSize");

// Starting...
startButton.addEventListener("click", (e) => {
  e.preventDefault();
  startPage.classList.add("disable");
  let rowCols = getGridSize();
  container_grid.style.gridTemplateColumns = `repeat(${rowCols}, 1fr)`;
  container_grid.style.gridTemplateRows = `repeat(${rowCols}, 1fr)`;
  let previousTime = 0;
  let gridArray = generateRandomArray(rowCols);
  drawCells(gridArray, rowCols);
  timeInterval();
  function timeInterval(currentTime) {
    window.requestAnimationFrame(timeInterval);
    if (currentTime - previousTime < 100) return;
    previousTime = currentTime;
    gridArray = generateNextArray(gridArray, rowCols);
  }
});

// Creates New Array For Next Generation
function generateNextArray(gridArray, rowCols) {
  let newArray = [];
  for (let i = 0; i < rowCols; i++) {
    newArray[i] = [];
    for (let j = 0; j < rowCols; j++) {
      newArray[i].push(nextValue(gridArray, i, j, rowCols));
    }
  }
  return newArray;
}

// Update The Cell Based On Neighbouring Cells And Returns The Value
function nextValue(oldArray, curRow, curCol, rowCols) {
  let count = 0;
  for (let i = curRow - 1; i <= curRow + 1; i++) {
    for (let j = curCol - 1; j <= curCol + 1; j++) {
      if (oldArray[(i + rowCols) % rowCols][(j + rowCols) % rowCols] === 1) {
        count++;
      }
    }
  }
  if (oldArray[curRow][curCol] === 1) count--;
  if (count < 2 || count > 3) {
    if (oldArray[curRow][curCol] === 1)
      updateCell(rowCols * curRow + curCol, 0);
    return 0;
  } else if (count === 3) {
    if (oldArray[curRow][curCol] === 0)
      updateCell(rowCols * curRow + curCol, 1);
    return 1;
  } else return oldArray[curRow][curCol];
}

// Draws Grid Based On Random Array
function drawCells(arr, rowCols) {
  for (let i = 0; i < rowCols; i++) {
    for (let j = 0; j < rowCols; j++) {
      drawCell(arr[i][j], i, j);
    }
  }
}

// Draw Initial Cells Based On Randomly Generated Array
function drawCell(value, row, col) {
  let cell = document.createElement(`div`);
  if (value === 1) cell.classList.add("alive");
  else cell.classList.add("dead");
  cell.classList.add("grid-border");
  cell.style.gridRow = row + 1;
  cell.style.gridColumn = col + 1;
  container_grid.appendChild(cell);
}

// Generates Initial Array For Randomly
function generateRandomArray(rowCols) {
  let tempArray = [];
  for (let i = 0; i < rowCols; i++) {
    tempArray[i] = [];
    for (let j = 0; j < rowCols; j++) {
      tempArray[i].push(getRandom());
    }
  }
  return tempArray;
}

// Updates The Changed Cells
function updateCell(position, value) {
  if (value === 0) {
    container_grid.children[position].classList.add("dead");
    container_grid.children[position].classList.remove("alive");
  } else {
    container_grid.children[position].classList.add("alive");
    container_grid.children[position].classList.remove("dead");
  }
}

// Generates Random
function getRandom() {
  return Math.random() < 0.69 ? 0 : 1;
}

// Returns Grid Size Based On Selected Value
function getGridSize() {
  return Number(gridSize[gridSize.selectedIndex].value);
}
