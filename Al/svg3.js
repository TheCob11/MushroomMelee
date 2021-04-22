
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var img = new Image();
img.src = "/svgSketch2.svg";
// img.src = "/hock.svg";

img.onload = function () {
  ctx.drawImage(img, 0, 0, 500, 500);
}

