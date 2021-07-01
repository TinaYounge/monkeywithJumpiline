//paint the canvas

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//create rectangle inside the canvas
let boxX = 100,
  boxY = 230,
  boxWid = 50,
  boxHig = 50;
ctx.beginPath();
ctx.rect(boxX, boxY, boxWid, boxHig);
ctx.fillStyle = "#79D5DA";
ctx.fill();
ctx.closePath();
//create the circle inside the rectangle
let dotX = boxX + boxWid / 2,
  dotY = boxY + boxHig / 2;
// ctx.drawImage(img, 10, 10);
var img = document.getElementById("banana");
var imgs = document.getElementById("bananaonthetree");
var imgjum = document.getElementById("jumpoline");

function drawBall() {
  ctx.beginPath();
  // ctx.arc(dotX, dotY, 20, 0, Math.PI * 2, false);
  // ctx.fillStyle = "#F4F719";
  ctx.drawImage(img, dotX - 20, dotY - 20, 40, 40);

  ctx.fill();
  ctx.closePath();
}
drawBall();
// create the stroke
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 5, 0, 3)";
ctx.stroke();
ctx.closePath();
// move the ball
// 1. create the draw function
var paddleHeight = 50,
  paddleWidth = 300,
  paddleX = (canvas.width - paddleWidth) / 2;

var dx = 2;
var dy = paddleHeight / 2;
var ballRadius = 20;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();

  // bouncing off the top and bottom
  if (dotY + dy > canvas.height - ballRadius || dotY + dy < ballRadius) {
    dy = -dy;
  }
  // Bouncing off the left and right
  if (dotX + dx > canvas.width - ballRadius || dotX + dx < ballRadius) {
    dx = -dx;
  }
  dotX += dx;
  dotY += (dotX - 300) * 0.0009 * dy;
  drawPaddle();
  drawScore();
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  if (dotY + dy < ballRadius) {
    dotY += (dotX - 300) * 0.009 * dy;
    dx = -dx;
  } else if (dotY + dy > canvas.height - ballRadius) {
    if (dotX > paddleX && dotX < paddleX + paddleWidth) {
      dotY += -(dotX - 300) * 0.0009 * dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }
  collisionDetection();
}
var interval = setInterval(draw, 10);
// setInterval(draw, 10);
// paddle and keyboard controls
// Defining a paddle to hit the ball
var paddleHeight = 50,
  paddleWidth = 300,
  paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
  ctx.beginPath();
  ctx.drawImage(
    imgjum,
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );

  // ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  // ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Allow user to control the paddle
var rightPressed = false,
  leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
// The paddle moving logic
// if (rightPressed) {
//   paddleX += 7;
// } else if (leftPressed) {
//   paddleX -= 7;
// }
// keyUpHandler();
// Implementing game over
// Build the brick field
// Setting up the brick variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status != 0) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.drawImage(imgs, brickX, brickY, brickWidth, brickHeight);
        // ctx.rect(brickX, brickY, brickWidth, brickHeight);
        // ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// Collision detection
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
console.log(bricks);
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          dotX > b.x &&
          dotX < b.x + brickWidth &&
          dotY > b.y &&
          dotY < b.y + brickHeight
        ) {
          dy = -0.95 * dy;
          b.status = 0;
          score++;
          score++;

          //
        }
      }
    }
    // if (b.status == 1) {
    //   if (
    //     dotX > b.x &&
    //     dotX < b.x + brickWidth &&
    //     dotY > b.y &&
    //     dotY < b.y + brickHeight
    //   ) {
    //     dy = -0.95 * dy;
    //     b.status = 0;
    //     score++;

    //     //
    //   }
    // }
  }
  console.log("here");
}
// Score
var score = 9;
function drawScore() {
  ctx.font = "20px solid Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + score * 2, 8, 20);
}
