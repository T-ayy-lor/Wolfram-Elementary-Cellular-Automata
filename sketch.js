let cells = [1, 0, 0, 1, 0, 1, 0, 1, 1, 0];
let w = 10; // width of each cell
let y = 0;

function setup() {
  createCanvas(410, 410);
  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = 0;
  }
  cells[floor(total / 2)] = 1; // make middle state 1
  background(255);
}

function draw() {

  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    stroke(0);
    fill(255 - cells[i] * 255); // Black when cell is 1
    square(x, y, w);
  }

  // render new generations
  y += w;

  // If the canvas is filled, reset the simulation
  // if (y >= height) {
  //   if (frameCount % 120 == 0) { // Wait ~2 seconds (assuming 60 FPS)
  //     resetSketch();
  //   }
  //   return;
  // }
  
  let nextCells = []; // New state is a function of cells current neighbors
  // Ignore edges
  nextCells[0] = cells[0];
  nextCells[cells.length - 1] = cells[cells.length - 1];
  for (let i = 1; i < cells.length - 1; i++) {
    // Define neighborhood
    let left = cells[i - 1];
    let right = cells[i + 1];
    let state = cells[i];
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
}

function calculateState(left, state, right) {
  // Define ruleset
  if (left == 1 && state == 1 && right == 1) return 1;
  if (left == 1 && state == 1 && right == 0) return 0;
  if (left == 1 && state == 0 && right == 1) return 1;
  if (left == 1 && state == 0 && right == 0) return 1;
  if (left == 0 && state == 1 && right == 1) return 0;
  if (left == 0 && state == 1 && right == 0) return 0;
  if (left == 0 && state == 0 && right == 1) return 1;
  if (left == 0 && state == 0 && right == 0) return 0;

}

function resetSketch() {
  background(255); // Clear canvas
  y = 0; // Reset y position
}
