"use strict";
alert("This is a beta version and will not save your data. Go to https://SpaceShooter.thecob.repl.co/backup.html for a better experience.");
var canvas = document.createElement("canvas")
  , scene = canvas.getContext("2d");
scene.canvas.width = window.innerWidth,
  scene.canvas.height = window.innerHeight;
canvas.style.zIndex = "99";
var screenToShip = 6
  , scrWidth = scene.canvas.width
  , scrHeight = scene.canvas.height
  , charWidth = scrWidth / screenToShip
  , charHeight = scrHeight / screenToShip
  , yPos = scrHeight / 4.705
  , xPos = scrWidth / 38.4
  , laserW = 60
  , laserH = 7
  , lasers = []
  , spReleased = !1
  , uPressed = !1
  , dPressed = !1
  , spPressed = !1
  , mouseX = 0
  , mouseY = 0
  , mouseClick = !1
  , mouseReleased = !1;
document.addEventListener("keydown", e => {
  e.key;
  switch (e.keyCode) {
    case 87:
    case 38:
      uPressed = !0;
      break;
    case 32:
      spPressed = !0;
      break;
    case 83:
    case 40:
      dPressed = !0
  }
}
  , !1),
  document.addEventListener("keyup", e => {
    e.key;
    switch (e.keyCode) {
      case 87:
      case 38:
        uPressed = !1;
        break;
      case 32:
        spPressed = !1,
          spReleased = !0;
        break;
      case 83:
      case 40:
        dPressed = !1
    }
  }
    , !1),
  document.addEventListener("mousemove", e => {
    mouseX = e.clientX,
      mouseY = e.clientY
  }
    , !1),
  document.addEventListener("mousedown", e => {
    mouseClick = !0
  }
    , !1),
  document.addEventListener("mouseup", e => {
    mouseClick = !1,
      mouseReleased = !0
  }
    , !1),
  document.addEventListener("touchmove", e => {
    mouseX = e.touches[0].clientX,
      mouseY = e.touches[0].clientY
  }
  ),
  document.addEventListener("touchstart", e => {
    mouseX = e.touches[0].clientX,
      mouseY = e.touches[0].clientY,
      mouseClick = !0
  }
    , !1),
  document.addEventListener("touchend", e => {
    mouseX = e.touches[0].clientX,
      mouseY = e.touches[0].clientY,
      mouseClick = !1,
      mouseReleased = !0
  }
    , !1),
  window.mobileAndTabletCheck = function () {
    let e = !1;
    var s;
    return s = navigator.userAgent || navigator.vendor || window.opera,
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(s) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(s.substr(0, 4))) && (e = !0),
      e
  }
  ;
var upButton = new Image;
upButton.src = "https://spaceshooter.thecob.repl.co/Media/upButton.png";
var downButton = new Image;
downButton.src = "https://spaceshooter.thecob.repl.co/Media/downButton.png";
var shootButton = new Image;
shootButton.src = "https://spaceshooter.thecob.repl.co/Media/shootButton.png";
var controls = [{
  type: upButton,
  x: 30,
  y: scrHeight - 120
}, {
  type: downButton,
  x: 30,
  y: scrHeight - 60
}, {
  type: shootButton,
  x: scrWidth - 80,
  y: scrHeight - 90
}]
  , charSpeed = 5
  , laserSpeed = 8
  , pew = new Audio("https://spaceshooter.thecob.repl.co/Media/pewpew.mp3");
pew.volume = .4;
var boom = new Audio("https://spaceshooter.thecob.repl.co/Media/boom.mp3")
  , ship = new Image;
ship.src = "https://spaceshooter.thecob.repl.co/Media/ship.png";
var explosion = new Image;
explosion.src = "https://spaceshooter.thecob.repl.co/Media/explosion.png";
var bkgnd = new Image;
bkgnd.src = "https://spaceshooter.thecob.repl.co/Other/bkgndPlaceholder.png";
var bkgndX = 0
  , scrollSpeed = 1
  , enemies = []
  , enemy1 = new Image;
enemy1.src = "https://spaceshooter.thecob.repl.co/Media/shroom.png";
var enemy2 = new Image;
enemy2.src = "https://spaceshooter.thecob.repl.co/Media/SHromo.png";
var enemy3 = new Image;
enemy3.src = "https://spaceshooter.thecob.repl.co/Media/shroomin.png";
var enemy4 = new Image;
enemy4.src = "https://spaceshooter.thecob.repl.co/Media/shroomsun.png";
var enemy5 = new Image;
enemy5.src = "https://spaceshooter.thecob.repl.co/Media/HR0OM.png";
var enemyW = 1.5 * charWidth
  , enemyH = 1.5 * charHeight
  , enemySpawnRate = 100
  , enemyShootRate = 100
  , level = 1
  , enemyValue = 100 * level
  , enemySpeed = 5
  , enemyHP = level
  , score = 0
  , finalScore = 0
  , finalLevel = 0;
var game = !0
  , damage = 1
  , charHp = 1
  , maxCharHp = 1
  , xpNeed = 1e3
  , dead = !1
  , upgrade = !1
  , enemyImg = "idk lmao"
  , enemyShoots = !1;
function nothin() { }
var holdToFire = setInterval(nothin, 3e3)
  , regen = setInterval(nothin, 3e3)
  , skills = [{
    tier: 1,
    side: 1,
    effect: function () {
      damage++
    },
    info: "Attack +1",
    alive: !0
  }, {
    tier: 1,
    side: 2,
    effect: function () {
      charHp = ++maxCharHp
    },
    info: "Health +1",
    alive: !0
  }, {
    tier: 1,
    side: 3,
    effect: function () {
      charSpeed++
    },
    info: "Speed +1",
    alive: !0
  }, {
    tier: 2,
    side: 1,
    effect: function () {
      damage++
    },
    info: "Attack +1",
    alive: !1
  }, {
    tier: 6,
    side: .4,
    effect: function () {
      score += (xpNeed - score) / 4
    },
    info: "Skip(Earn 25% Score)",
    alive: !0
  }, {
    tier: 2,
    side: 2,
    effect: function () {
      charHp = ++maxCharHp
    },
    info: "Health +1",
    alive: !1
  }, {
    tier: 2,
    side: 3,
    effect: function () {
      laserSpeed++
    },
    info: "Laser Speed +1",
    alive: !1
  }, {
    tier: 3,
    side: 1,
    effect: function () {
      damage = 1 / 0,
        enemySpawnRate = 69
    },
    info: "Infinite Damage, but double enemies"
  }, {
    tier: 3,
    side: 2,
    effect: function () {
      maxCharHp = 5,
        regen = setInterval(function () {
          charHp < maxCharHp && charHp++
        }, 3e3)
    },
    info: "Slowly Regenerate Health(Max: 5)"
  }, {
    tier: 3,
    side: 3,
    effect: function () {
      holdToFire = setInterval(function () {
        if (spPressed) {
          var e = {
            x: xPos + charWidth,
            y: yPos + charHeight / 2,
            alive: !0,
            evil: !1
          };
          lasers.unshift(e),
            pew.currentTime = 0,
            pew.play()
        }
      }, 100),
        enemyShootRate = 69
    },
    info: "Hold to fire, but Enemies shoot more"
  }];
function drawControls() {
  scene.save(),
    scene.globalAlpha = .2;
  for (let e = 0; e < controls.length; e++)
    if (scene.drawImage(controls[e].type, controls[e].x, controls[e].y, 50, 50),
      mouseClick) {
      if (mouseX >= controls[e].x && mouseX <= controls[e].x + 50 && mouseY >= controls[e].y && mouseY <= controls[e].y + 50)
        switch (controls[e].type) {
          case upButton:
            uPressed = !0;
            break;
          case downButton:
            dPressed = !0;
            break;
          case shootButton:
            spPressed = !0
        }
    } else
      mouseReleased && (uPressed = !1,
        dPressed = !1,
        spPressed = !1,
        spReleased = !0,
        mouseReleased = !1);
  scene.restore()
}
function pointInCircle(e, s, i, a, n) {
  return (e - i) * (e - i) + (s - a) * (s - a) <= n * n
}
function drawLasers() {
  scene.save();
  for (let e = 0; e < lasers.length; e++)
    scene.fillStyle = "#00FF00",
      scene.fillRect(lasers[e].x, lasers[e].y, laserW, laserH),
      lasers[e].evil ? lasers[e].x -= laserSpeed : lasers[e].x += laserSpeed,
      (lasers[e].x > scrWidth || lasers[e].x + laserW < 0) && (lasers[e].alive = !1),
      lasers[e].x <= xPos + charWidth && lasers[e].evil && lasers[e].y >= yPos && lasers[e].y <= yPos + charHeight && (lasers[e].alive = !1,
        charHp-- ,
        boom.currentTime = 0,
        scene.drawImage(explosion, xPos, yPos, charWidth, charHeight),
        boom.play(),
        charHp <= 0,
          finalScore = score,
          finalLevel = level,
          score = 0,
          level = 1,
          xpNeed = 1e3,
          game = !1,
          dead = !0),
      lasers[e].alive || lasers.splice(e, 1);
  scene.restore()
}
function drawEnemies() {
  for (let s = 0; s < enemies.length; s++) {
    switch (level) {
      case 1:
        enemyImg = enemy1,
          enemyShoots = !1;
        break;
      case 2:
        enemyImg = enemy2,
          enemyShoots = !0;
        break;
      case 3:
        enemyImg = enemy3;
        break;
      case 4:
        enemyImg = enemy4;
        break;
      case 5:
        enemyImg = enemy5;
        break;
      default:
        enemyImg = enemy5
    }
    if (scene.drawImage(enemyImg, enemies[s].x, enemies[s].y, enemyW, enemyH),
      enemies[s].x -= enemySpeed,
      69 == Math.floor(Math.random() * enemyShootRate + 1) && enemyShoots) {
      var e = {
        x: enemies[s].x,
        y: enemies[s].y + enemyH / 2,
        alive: !0,
        evil: !0
      };
      lasers.unshift(e)
    }
    enemies[s].x < 0 && (enemies[s].alive = !1,
      score -= enemyValue);
    for (let e = 0; e < lasers.length; e++)
      lasers[e].x + laserW >= enemies[s].x && !lasers[e].evil && lasers[e].y >= enemies[s].y && lasers[e].y <= enemies[s].y + enemyH && (lasers[e].alive = !1,
        enemies[s].hp -= damage,
        enemies[s].hp <= 0 && (enemies[s].alive = !1,
          score += enemyValue));
    xPos + charWidth >= enemies[s].x && xPos + charWidth <= enemies[s].x + enemyW && enemies[s].alive && yPos >= enemies[s].y && yPos <= [enemies[s].y + enemyH] && (enemies[s].alive = !1,
      --charHp <= 0,
        finalScore = score,
        finalLevel = level,
        score = 0,
        level = 1,
        xpNeed = 1e3,
        game = !1,
        dead = !0),
      enemies[s].alive || (boom.currentTime = 0,
        boom.play(),
        scene.drawImage(explosion, enemies[s].x, enemies[s].y, enemyW, enemyH),
        enemies.splice(s, 1))
  }
}
function drawScene() {
  if (scene.canvas.width = window.innerWidth,
    scene.canvas.height = window.innerHeight,
    scrWidth = window.innerWidth,
    scrHeight = window.innerHeight,
    game) {
    if (scene.canvas.height = window.innerHeight,
      scrWidth = window.innerWidth,
      scrHeight = window.innerHeight,
      scene.clearRect(0, 0, scrWidth, scrHeight),
      scene.drawImage(bkgnd, bkgndX, 0, scrWidth, scrHeight),
      scene.drawImage(bkgnd, bkgndX + scrWidth, 0, scrWidth, scrHeight),
      enemyValue = 100 * level,
      enemySpeed = 5,
      enemyHP = level,
      (bkgndX -= scrollSpeed) < -1 * scrWidth && (bkgndX = 0),
      scene.font = "20px Verdana",
      scene.fillStyle = "#FFFFFF",
      scene.fillText("Score: " + score + " Level: " + level + "(" + (xpNeed - score) + " till next level)", 50, 50),
      scene.fillText("❤️".repeat(charHp), 50, 70),
      scene.fillText("♡".repeat(maxCharHp - charHp), 50 + 30 * charHp, 70),
      scene.drawImage(ship, xPos, yPos, charWidth, charHeight),
      drawLasers(),
      window.mobileAndTabletCheck() && drawControls(),
      uPressed && (yPos < 0 ? yPos = scrHeight - charHeight : yPos -= charSpeed),
      dPressed && (yPos > scrHeight - charHeight ? yPos = 0 : yPos += charSpeed),
      spPressed && spReleased) {
      var e = {
        x: xPos + charWidth,
        y: yPos + charHeight / 2,
        alive: !0,
        evil: !1
      };
      lasers.unshift(e),
        pew.currentTime = 0,
        pew.play(),
        spReleased = !1
    }
    if (69 == Math.floor(Math.random() * enemySpawnRate + 1)) {
      var s = {
        x: scrWidth,
        y: Math.floor(Math.random() * (scrHeight - enemyH)),
        hp: enemyHP,
        alive: !0
      };
      enemies.unshift(s)
    }
    score >= xpNeed && (upgrade = !0,
      xpNeed += Math.floor(1 * xpNeed + level / 10),
      level++ ,
      game = !1),
      drawEnemies()
  } else if (upgrade) {
    scene.save(),
      scene.font = "30px Verdana",
      scene.textAlign = "center",
      scene.fillText("Level Up! Pick a skill!", scrWidth / 2, 30),
      enemies = [],
      lasers = [],
      charHp = maxCharHp;
    for (let e = 0; e < skills.length; e++) {
      if (scene.save(),
        scene.beginPath(),
        skills[e].alive || (scene.globalAlpha = .4),
        scene.arc(scrWidth / 4 * skills[e].side, scrHeight - 50 * skills[e].tier, 20, 0, 2 * Math.PI),
        scene.stroke(),
        pointInCircle(mouseX, mouseY, scrWidth / 4 * skills[e].side, scrHeight - 50 * skills[e].tier, 20) && (scene.beginPath(),
          scene.arc(scrWidth / 4 * skills[e].side, scrHeight - 50 * skills[e].tier, 20, 0, 2 * Math.PI),
          scene.fillStyle = "#A1FFBA",
          scene.fill(),
          scene.globalAlpha = .9,
          scene.fillText(skills[e].info, scrWidth / 2, 60),
          scene.globalAlpha = .4,
          mouseClick && skills[e].alive)) {
        skills[e].effect(),
          upgrade = !1,
          mouseReleased = !1,
          game = !0;
        try {
          for (let s = 0; s < skills.length; s++)
            skills[s].side == skills[e].side && skills[s].tier == skills[e].tier + 1 && (skills[s].alive = !0)
        } catch {
          console.log("no")
        } finally {
          skills[e].side < 1 ? skills[e].alive = !0 : skills[e].alive = !1
        }
      }
      scene.restore()
    }
  } else
    dead && (scene.save(),
      scene.clearRect(0, 0, scrWidth, scrHeight),
      scene.canvas.width = window.innerWidth,
      enemies = [],
      enemyShoots = !1,
      lasers = [],
      clearInterval(holdToFire),
      clearInterval(regen),
      skills = [{
        tier: 1,
        side: 1,
        effect: function () {
          damage++
        },
        info: "Attack +1",
        alive: !0
      }, {
        tier: 1,
        side: 2,
        effect: function () {
          charHp = ++maxCharHp
        },
        info: "Health +1",
        alive: !0
      }, {
        tier: 1,
        side: 3,
        effect: function () {
          charSpeed++
        },
        info: "Speed +1",
        alive: !0
      }, {
        tier: 2,
        side: 1,
        effect: function () {
          damage++
        },
        info: "Attack +1",
        alive: !1
      }, {
        tier: 6,
        side: .4,
        effect: function () {
          score += (xpNeed - score) / 4
        },
        info: "Skip(Earn 25% Score)",
        alive: !0
      }, {
        tier: 2,
        side: 2,
        effect: function () {
          charHp = ++maxCharHp
        },
        info: "Health +1",
        alive: !1
      }, {
        tier: 2,
        side: 3,
        effect: function () {
          laserSpeed++
        },
        info: "Laser Speed +1",
        alive: !1
      }, {
        tier: 3,
        side: 1,
        effect: function () {
          damage = 1 / 0,
            enemySpawnRate = 69
        },
        info: "Infinite Damage, but double enemies"
      }, {
        tier: 3,
        side: 2,
        effect: function () {
          maxCharHp = 5,
            regen = setInterval(function () {
              charHp < maxCharHp && charHp++
            }, 3e3)
        },
        info: "Slowly Regenerate Health(Max: 5)"
      }, {
        tier: 3,
        side: 3,
        effect: function () {
          holdToFire = setInterval(function () {
            if (spPressed) {
              var e = {
                x: xPos + charWidth,
                y: yPos + charHeight / 2,
                alive: !0,
                evil: !1
              };
              lasers.unshift(e),
                pew.currentTime = 0,
                pew.play()
            }
          }, 250),
            enemyShootRate = 69
        },
        info: "Hold to fire, but Enemies shoot more"
      }],
      charHp = 1,
      maxCharHp = 1,
      charSpeed = 5,
      damage = 1,
      yPos = scrHeight / 4.705,
      xPos = scrWidth / 38.4,
      scene.font = "50px Verdana",
      scene.fillStyle = "#FF0000",
      scene.textAlign = "center",
      scene.fillText("GAME OVER", scrWidth / 2, scrHeight / 2),
      scene.font = "30px Verdana",
      scene.fillText("Final Score: " + finalScore + "(Level " + finalLevel + ")", scrWidth / 2, scrHeight / 2 + 50),
      scene.fillText("High Score: BETA", scrWidth / 2, scrHeight / 2 + 100),
      scene.fillText("Click to play again", scrWidth / 2, scrHeight / 2 + 150),
      setTimeout(() => {
        mouseClick && (game = !0,
          dead = !1)
      }
        , 1e3),
      scene.restore());
  window.requestAnimationFrame(drawScene)
}
drawScene();
