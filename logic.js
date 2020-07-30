let chance = 0;
let gameOver = false;
let filled = 0;
let matrix2D = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

document.addEventListener("DOMContentLoaded", function () {
  buildBody();
  assignBoxVal();
});

function makeEntrie(param) {
  if (gameOver) {
    return;
  }
  if (param.getAttribute("set") == "0") {
    let pos = param.getAttribute("value");
    filled++;
    if (chance == 0) {
      chance = 1;
      document.getElementById("chanceDisp").innerHTML = "Player2 'X'";
      param.children[0].innerHTML = "O";
      param.children[0].setAttribute("style", "color:#F2EBD3");
      matrix2D[pos[0]][pos[1]] = "O";
      result(matrix2D, pos[0], pos[1], "O");
    } else {
      chance = 0;
      document.getElementById("chanceDisp").innerHTML = "Player1 'O'";
      param.children[0].innerHTML = "X";
      param.children[0].setAttribute("style", "color:#545454");
      matrix2D[pos[0]][pos[1]] = "X";
      result(matrix2D, pos[0], pos[1], "X");
    }
    param.setAttribute("set", "1");
  }
}

function result(m, x, y, char) {
  // # diagonal1
  d1 = `${m[0][0]}` + `${m[1][1]}` + `${m[2][2]}`;
  // # diagonal2
  d2 = `${m[0][2]}` + `${m[1][1]}` + `${m[2][0]}`;
  // # vertical
  v = `${m[0][y]}` + `${m[1][y]}` + `${m[2][y]}`;
  // # horizontal
  h = `${m[x][0]}` + `${m[x][1]}` + `${m[x][2]}`;
  r = char + char + char;
  if (d1 == r) {
    win(char, "d1");
  } else if (d2 == r) {
    win(char, "d2");
  } else if (v == r) {
    win(char, `v${y}`);
  } else if (h == r) {
    win(char, `h${x}`);
  } else if (filled == 9) {
    draw();
  }
}

function assignBoxVal() {
  let boxes = document.getElementsByClassName("box");
  let col = 0;
  let row = 0;
  [].forEach.call(boxes, (element) => {
    if (col == 3) {
      col = 0;
      row++;
    }
    element.setAttribute("value", `${row}${col}`);
    col++;
  });
}

function win(player, strike) {
  gameOver = true;
  console.log(player + " win" + " dir " + strike);
  drawStrike(strike);
  document.getElementById("chanceDisp").innerHTML = `Player ${
    player == "O" ? "1('O')" : "2('X')"
  } wins`;
  console.log(document.getElementById("chanceDisp").innerHTML);
}
function draw() {
  gameOver = true;
  document.getElementById("chanceDisp").innerHTML = "This Game is Draw";
  console.log(document.getElementById("chanceDisp").innerHTML);
}

function drawStrike(dir) {
  let svg = document.getElementById("svg");
  svg.setAttribute("display", "block");
  if (dir == "d1") {
    svg.innerHTML = `  <line
     x1="1em"
     y1="1em"
     x2="15em"
     y2="15em"
     style="stroke:#545454; stroke-width: 4;"
   />`;
    svg.setAttribute("style", `margin-top: -16.5em`);
  } else if (dir == "d2") {
    svg.innerHTML = `  <line
     x1="15em"
     y1="1em"
     x2="1em"
     y2="15em"
     style="stroke:#545454; stroke-width: 4;"
   />`;
    svg.setAttribute("style", `margin-top: -16.5em`);
  } else if (dir[0] == "v") {
    svg.innerHTML = `  <line
     x1="${2.5 + parseInt(dir[1]) * 5.5}em"
     y1="1em"
     x2="${2.5 + parseInt(dir[1]) * 5.5}em"
     y2="14em"
     style="stroke:#545454; stroke-width: 4;"
   />`;
    svg.setAttribute("style", `margin-top: -16em`);
  } else if (dir[0] == "h") {
    svg.innerHTML = `  <line
     x1="1em"
     y1="2em"
     x2="15em"
     y2="2em"
     style="stroke:#545454; stroke-width: 4;"
   />`;
    svg.setAttribute(
      "style",
      `margin-top: ${-5.5 * (3 - parseInt(dir[1])) + 0.5}em`
    );
  }
}

function reset() {
  location.reload();
}

function buildBody() {
  let disp = document.createElement("h1");
  disp.id = "chanceDisp";
  disp.innerHTML = "Player1 'O'";
  document.body.appendChild(disp);
  let btn = document.createElement("button");
  btn.className = "button";
  btn.onclick = function () {
    reset();
  };
  btn.innerHTML = "Reset";
  document.body.appendChild(btn);
  let main = document.createElement("div");
  main.className = "main";
  let playerBox = document.createElement("div");
  playerBox.className = "playerBox";
  for (let i = 0; i < 9; i++) {
    let box = document.createElement("div");
    box.className = "box";
    box.onclick = function () {
      makeEntrie(this);
    };
    box.setAttribute("set", "0");
    let glyph = document.createElement("div");
    glyph.className = "glyph";
    box.appendChild(glyph);
    playerBox.appendChild(box);
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "15em");
  svg.setAttribute("width", "15em");
  svg.setAttribute("id", "svg");
  svg.setAttribute("display", "none");
  svg.innerHTML = `  <line
     x1="1em"
     y1="1em"
     x2="15em"
     y2="15em"
     style="stroke:#545454; stroke-width: 4;"
   />`;
  playerBox.appendChild(svg);
  main.appendChild(playerBox);
  document.body.appendChild(main);
}
