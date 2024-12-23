const duration = 100,
  startPage = document.getElementById("startPage"),
  startButton = document.getElementById("startButton"),
  container_grid = document.getElementById("container-grid"),
  gridSize = document.getElementById("gridSize");
startButton.addEventListener("click", (e) => {
  e.preventDefault();
  startPage.classList.add("disable");
  let rowCols = getGridSize();
  container_grid.style.gridTemplateColumns = `repeat(${rowCols}, 1fr)`;
  container_grid.style.gridTemplateRows = `repeat(${rowCols}, 1fr)`;
  let gridArray = generateRandomArray(rowCols);

  setInterval(() => {
    container_grid.innerHTML = "";
    drawCells(gridArray, rowCols);
    gridArray = generateNextArray(gridArray, rowCols);
  }, duration);
});

function getGridSize() {
  return Number(gridSize[gridSize.selectedIndex].value);
}

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
  if (count < 2 || count > 3) return 0;
  else if (count === 3) return 1;
  else return oldArray[curRow][curCol];
}

function drawCells(arr, rowCols) {
  for (let i = 0; i < rowCols; i++) {
    for (let j = 0; j < rowCols; j++) {
      drawCell(arr[i][j], i, j);
    }
  }
}

function drawCell(value, row, col) {
  let cell = document.createElement(`div`);
  if (value === 1) cell.classList.add("alive");
  else cell.classList.add("dead");
  cell.classList.add("grid-border");
  cell.style.gridRow = row + 1;
  cell.style.gridColumn = col + 1;
  container_grid.appendChild(cell);
}

function getRandom() {
  return Math.random() < 0.69 ? 0 : 1;
}

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
