// Daniel Shiffman
// http://codingtra.in
// Adaptation by Sylvain Bérubé
// http://www.facebook.com/sylvain.berube.geek

var cols, rows;
var w = 30;
var grid = [];
var current;
var stack = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor((width - w/2) / (3/2*w));
  rows = floor((height - sqrt(3)/2*w) / (sqrt(3)*w));
  frameRate(20);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  background(255);
  for (var cellule of grid) {
    cellule.show();
  }
  
  current.visited = true;
  current.highlight();
  
  // STEP 1
  var next = current.checkNeighbors();
  
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

}

function index(i, j) {
  if (i<0 || j<0 || i>rows-1 || j>cols-1) {
    return -1;
  }
  return i*cols + j;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  if (x === -1 && y === 0) {
    a.walls[3] = false;
    b.walls[0] = false;
  }
  if (x === 1 && y === 0) {
    a.walls[0] = false;
    b.walls[3] = false;
  }

  if (x === 0 && y === -1 && (a.j)%2 === 0) {
    a.walls[2] = false;
    b.walls[5] = false;
  }
  if (x === 0 && y === 1 && (a.j)%2 === 1) {
    a.walls[5] = false;
    b.walls[2] = false;
  }
  if (x === 0 && y === -1 && (a.j)%2 === 1) {
    a.walls[1] = false;
    b.walls[4] = false;
  }
  if (x === 0 && y === 1 && (a.j)%2 === 0) {
    a.walls[4] = false;
    b.walls[1] = false;
  }

  if (x === 1 && y === -1 && (a.j)%2 === 0) {
    a.walls[1] = false;
    b.walls[4] = false;
  }
  if (x === -1 && y === 1 && (a.j)%2 === 1) {
    a.walls[4] = false;
    b.walls[1] = false;
  }
  if (x === -1 && y === -1 && (a.j)%2 === 1) {
    a.walls[2] = false;
    b.walls[5] = false;
  }
  if (x === 1 && y === 1 && (a.j)%2 === 0) {
    a.walls[5] = false;
    b.walls[2] = false;
  }
} 
