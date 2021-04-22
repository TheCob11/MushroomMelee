'use strict';
// https://farenheit451.252061.repl.co/_notes/kirupa/index.html
var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext("2d");
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

var hock = new Image();
hock.src = "/Other/hock.png";

var requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var circleRadius = 15;
var xPosInit = circleRadius / 2;
var yPosInit = circleRadius / 2;
var xStep = 2;
var yStep = 1;
var xDir = 1;
var yDir = 1;
var xLimitMin = circleRadius / 2;
var xLimitMax = canvasWidth - circleRadius / 2;
var yLimitMin = circleRadius / 2;
var yLimitMax = canvasHeight - circleRadius / 2;

var xPos = xPosInit;
var yPos = yPosInit;

var xPosTarget = canvasWidth / 2;
var yPosTarget = canvasHeight / 2;
var targetRadius = circleRadius * 3;

var platforms = [
  { "name" : "P1", id : 0, "xStart" : 0   , "width" : 50 , "height" : 5 , "y" : 400},
  { "name" : "P2", id : 1, "xStart" : 100 , "width" : 50 , "height" : 5, "y" :  400},
  { "name" : "P3", id : 2, "xStart" : 200 , "width" : 50 , "height" : 5 , "y" : 400},
  { "name" : "P4", id : 3, "xStart" : 300 , "width" : 50 , "height" : 5 , "y" : 400},
  { "name" : "P5", id : 4, "xStart" : 400 , "width" : 50 , "height" : 5 , "y" : 400}
]

function drawPlatforms() {
  for (let i=0;i<platforms.length;i++) {
    mainContext.fillStyle = "#FF0000";

    // console.log(platforms[i]);
    // console.log("Draw at x:" + platforms[i].xStart + " y: "+ platforms[i].y + " w: " + platforms[i].width + " h: " + platforms[i].height);
    
    mainContext.fillRect(platforms[i].xStart, platforms[i].y-platforms[i].height, platforms[i].width, platforms[i].height);
  }
}

function checkBounceOnPlatforms() {
  // console.log("Checking Platforms");
  for (let i=0;i<platforms.length;i++) {
    if (Math.abs(yPos-platforms[i].y)<5 && xPos>=platforms[i].xStart && xPos<=platforms[i].xStart+platforms[i].width) {
      // alert(`Bounce on + ${i}`);
      // xDir = xDir * -1;
      yDir = yDir * -1;
      return i;
    }
  }
  return -1;
}

function pauseBrowser(millis) {
  var date = Date.now();
  var curDate = null;
  do {
    curDate = Date.now();
  } while (curDate - date < millis);
}

function drawText() {
  // The size of the emoji is set with the font
  mainContext.font = '200px serif'
  // use these alignment properties for "better" positioning
  mainContext.textAlign = "center";
  mainContext.textBaseline = "middle";
  // draw the emoji
  // https://emojipedia.org/
  mainContext.fillText('🔥', xPosTarget, yPosTarget)
}

function getRandomNumInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function checkBoom() {
  if (Math.abs(xPos - xPosTarget) <= 50 && Math.abs(yPos - yPosTarget) <= 50) {
    return true;
  } else {
    return false;
  }
}

function showBoom() {
  // setTimeout(function () {
  /*
mainContext.beginPath();
mainContext.arc(xPosTarget, yPosTarget, targetRadius * 2, 0, Math.PI * 2, false);
mainContext.closePath();
mainContext.fillStyle = "#ff0000";
mainContext.fill();
*/
  drawText();
  // }, (5 * 1000));
  // pauseBrowser(1000);
}

function drawTarget() {
  mainContext.beginPath();
  mainContext.arc(xPosTarget, yPosTarget, targetRadius, 0, Math.PI * 2, false);
  mainContext.closePath();
  mainContext.fillStyle = "#001234";
  mainContext.fill();
  if (checkBoom()) {
    showBoom();
  }
}

function drawCircle() {

  if (checkBoom()) {
    // setTimeout(function () {
    xPos = xPosInit;
    yPos = yPosInit;
    // xPos = getRandomNumInRange(xLimitMin, xLimitMax);
    // yPos = getRandomNumInRange(xLimitMin, xLimitMax);
    pauseBrowser(1000);
    xPosTarget = getRandomNumInRange(xLimitMin, xLimitMax);
    yPosTarget = getRandomNumInRange(xLimitMin, xLimitMax);

    // }, (1 * 1000));
  } else {
    // draw the circle
    
    /*
    mainContext.beginPath();
    mainContext.arc(xPos, yPos, circleRadius, 0, Math.PI * 2, false);
    mainContext.closePath();
    // color in the circle
    mainContext.fillStyle = "#006699";
    mainContext.fill();
    */

    mainContext.drawImage(hock, xPos, yPos, 50, 50);
  }

  xPos += xDir * xStep;
  yPos += yDir * yStep;
  if (xPos < xLimitMin)
    xDir = 1;
  else if (xPos > xLimitMax)
    xDir = -1;

  if (yPos < yLimitMin)
    yDir = 1;
  else if (yPos > yLimitMax)
    yDir = -1;
}

function drawScene() {
  mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
  // color in the background
  mainContext.fillStyle = "#EEEEEE";
  mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

  checkBounceOnPlatforms();
  
  drawCircle();
  drawTarget();

  drawPlatforms();



  requestAnimationFrame(drawScene);
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  console.log(keyName + ' => ' + event.keyCode + ' was key was pressed');

  if (keyName === 'Control') {
    // do not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the same time.
    // alert(`Combination of ctrlKey + ${keyName}`);
  } else {
    // alert(`Key pressed ${keyName}`);
  }
}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  console.log(keyName + ' => ' + event.keyCode + ' was key was released');

  // As the user releases the Ctrl key, the key is no longer active,
  // so event.ctrlKey is false.
  if (keyName === 'Control') {
    // alert('Control key was released');
  }
}, false);

drawScene();