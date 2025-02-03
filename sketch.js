let cells = [];
let ruleValue = 0; // wolfram
let ruleSet = '';
let w = 5; // width of each cell
let y = 0;

function setup() {
  createCanvas(600, 600);

  let total = width / w;
  cells = new Array(total).fill(0);
  cells[floor(total / 2)] = 1;
  background(255);
}

function draw() {
  ruleSet = ruleValue.toString(2).padStart(8, "0"); // returns binary of ruleValue, padStart handles leading 0s
  console.log(ruleSet);

  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    stroke(0);
    fill(255 - cells[i] * 255); // Black when cell is 1
    square(x, y, w);
  }

  // render new generations
  y += w;

  // When the canvas is filled, pause the loop and reset
  if (y >= height) {
    noLoop();
    setTimeout(() => {
      ruleValue++;
      console.log(ruleValue);
      if (ruleValue > 255) {
        ruleValue = 0;
      }
      resetSketch();
      loop();
    }, 2000);
    return;
  }
  
  let len = cells.length;
  let nextCells = []; // New state is a function of cells current neighbors
  for (let i = 0; i < cells.length; i++) {
    // Define neighborhood
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1 + len) % len];
    let state = cells[i];
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
}

function calculateState(left, state, right) {
  // Define ruleset
  let neighborhood = '' + left + state + right;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}

function resetSketch() {
  background(255); // Clear canvas
  y = 0; // Reset y position

  // Reinitialize the cells array
  let total = width / w;
  cells = new Array(total).fill(0);
  cells[floor(total / 2)] = 1;
}
