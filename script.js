'use strict';

var canvas = document.getElementById("canvas")
var scene = canvas.getContext('2d')
scene.canvas.width = window.innerWidth
scene.canvas.height = window.innerHeight
var screenToShip = 6 //aspect ratio
var scrWidth = scene.canvas.width
var scrHeight = scene.canvas.height
var charWidth = scrWidth / screenToShip
var charHeight = scrHeight / screenToShip
var yPos = scrHeight / 4.705
var xPos = scrWidth / 38.4
var laserW = 60
var laserH = 7
var bombS = 20
var enemyHomingSpeed = 2
var lasers = []
var enemyDamage = 1
var spReleased = false
var uPressed = false;
var dPressed = false;
var spPressed = false;
var escPressed = false
var escReleased = false
var ePressed = false
var eReleased = false
var mouseX = 0
var mouseY = 0
var mouseClick = false
var mouseReleased = false
var skipped = false
function nothin() {
	//nope
}
var holdToFire = setInterval(nothin, 3000)
var regen = setInterval(nothin, 3000)
var skillsInit = [
	{ "tier": 1, "side": 1, "effect": function () { damage++ }, "info": "Attack +1", "price": 1, "alive": true },
	{ "tier": 1, "side": 2, "effect": function () { maxCharHp++; charHp = maxCharHp }, "info": "Health +1", "price": 1, "alive": true },
	{ "tier": 1, "side": 3, "effect": function () { charSpeed++ }, "info": "Speed +1", "price": 1, "alive": true },
	{ "tier": 2, "side": 1, "effect": function () { damage++ }, "info": "Attack +1", "price": 1, "alive": false },
	{ "tier": 2, "side": 2, "effect": function () { maxCharHp++; charHp = maxCharHp }, "info": "Health +1", "price": 1, "alive": false },
	{ "tier": 2, "side": 3, "effect": function () { laserSpeed++ }, "info": "Laser Speed +1", "price": 1, "alive": false },
	{ "tier": 3, "side": 1, "effect": function () { damage = Infinity; enemyDamage++ }, "info": "Infinite Damage, but enemies do more damage", "price": 2 },
	{ "tier": 3, "side": 2, "effect": function () { maxCharHp = 5; regen = setInterval(function () { if (charHp < maxCharHp) { charHp++ } }, 5000); }, "info": "Slowly Regenerate Health(Max: 5)", "price": 2 },
	{
		"tier": 3, "side": 3, "effect": function () {
			holdToFire = setInterval(function () {
				if (spPressed && game) {
					var laser = { "color": "#00FF00", "x": xPos + charWidth, "y": yPos + (charHeight / 2), "w": laserW, "h": laserH, "alive": true, "evil": false, "damage": damage, "speed": laserSpeed }
					switch (weapon) {
						case 1:
							laser["bomb"] = charBomb.r
							laser["splash"] = false
							laser["hp"] = bombHp
							laser.w = bombS
							laser.h = bombS
							laser.color = "#00FFFF"
							laser.damage = charBomb.damage
							break;
						case 2:
							laser["homing"] = charHoming.speed
							laser.color = "#FF0000"
							laser.damage = charHoming.damage
							break;
					}
					lasers.unshift(laser);
					pew.currentTime = 0;
					pew.play()
					spReleased = false
				}
			}, 200)
		}, "info": "Hold to fire", "price": 2
	},
	{ "tier": 6, "side": .4, "effect": function () { score += ((xpNeed - score) / 4) }, "info": "Skip(Earn 25% Score)", "price": 0, "alive": true }
]
var skills = skillsInit.map(object => ({ ...object }))
var skillPoints = 0
function skip10() {
	alert("lvl15")
	for (let i = 0; i < skills.length - 1; i++) {
		skills[i].alive = false
		skills[i].effect()
		skills[i].info = "cheater lol"
	}
	charBomb.alive = true
	charHoming.alive = true
	charHp = 5
	level = 15
	skipped = true
}
document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	switch (event.keyCode) {
		case 87:
		case 38:
			uPressed = true
			break;
		case 32:
			spPressed = true
			break;
		case 83:
		case 40:
			dPressed = true
			break;
		case 27:
			escPressed = true
			// console.log('leave')
			break;
		case 69:
		case 191:
			ePressed = true
			break;
		default:
			break;
	}
}, false);

document.addEventListener('keyup', (event) => {
	const keyName = event.key;

	// As the user releases the Ctrl key, the key is no longer active,
	// so event.ctrlKey is false.
	// console.log(keyName + ' => ' + event.keyCode + ' was key was released');

	switch (event.keyCode) {
		case 87:
		case 38:
			uPressed = false
			break;
		case 32:
			spPressed = false
			spReleased = true
			break;
		case 83:
		case 40:
			dPressed = false
			break;
		case 27:
			escPressed = false
			escReleased = true
			// console.log("left")
			break;
		case 69:
		case 191:
			ePressed = false
			eReleased = true
			// console.log("switch")
			break;
		case 84:
			// if (!skipped) { skip10() } //THE SKIP CLAUSE
			break;
		default:
			break;
	}
}, false);

document.addEventListener('mousemove', (event) => {
	mouseX = event.clientX
	mouseY = event.clientY
	// console.log("x: "+mouseX+"\ny:"+mouseY)
}, false)
document.addEventListener('mousedown', (event) => {
	// console.log("clicked at "+mouseX+" "+mouseY)
	mouseClick = true
}, false)
document.addEventListener('mouseup', (event) => {
	mouseClick = false
	mouseReleased = true
}, false)
document.addEventListener('touchmove', (event) => {
	mouseX = event.touches[0].clientX;
	mouseY = event.touches[0].clientY;
})
document.addEventListener('touchstart', (event) => {
	// console.log("clicked at "+mouseX+" "+mouseY)
	mouseX = event.touches[0].clientX;
	mouseY = event.touches[0].clientY;
	mouseClick = true
}, false)
document.addEventListener('touchend', (event) => {
	mouseX = event.touches[0].clientX;
	mouseY = event.touches[0].clientY;
	mouseClick = false
	mouseReleased = true
}, false)

window.mobileAndTabletCheck = function () {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};
var upButton = new Image();
upButton.src = "/Media/upButton.png"
var downButton = new Image();
downButton.src = "/Media/downButton.png"
var shootButton = new Image();
shootButton.src = "/Media/shootButton.png"
var controls = [
	{ "type": upButton, "x": 30, "y": scrHeight - 120 },
	{ "type": downButton, "x": 30, "y": scrHeight - 60 },
	{ "type": shootButton, "x": scrWidth - 80, "y": scrHeight - 90 }
]
var charSpeed = 5
var laserSpeed = 8
var enemyLaserSpeed = 8
var pew = new Audio("/Media/pewpew.mp3")
pew.volume = .4
var boom = new Audio("/Media/boom.mp3")
var ship = new Image();
ship.src = "/Media/ship.png";
var explosion = new Image();
explosion.src = "/Media/explosion.png";
var bkgnd = new Image();
// bkgnd.src = "/Media/spaec_be_like_i_am_space.png" gotta fix cutoff
bkgnd.src = "/Other/bkgndPlaceholder.png"
var bkgndX = 0
var scrollSpeed = 1;
var enemies = []
var enemy1 = new Image();
enemy1.src = "/Media/shroom.png";
var enemy2 = new Image();
enemy2.src = "/Media/SHromo.png";
var enemy3 = new Image();
enemy3.src = "/Media/shroomin.png";
var enemy4 = new Image();
enemy4.src = "/Media/shroomsun.png";
var enemy5 = new Image();
enemy5.src = "/Media/HR0OM.png";
var heartImg = new Image();
heartImg.src = "/Media/heart.png";
var enemyW = charWidth * 1.5
var enemyH = charHeight * 1.5
var enemySpawnRate = 100
var enemyShootRate = 100
var level = 1
var enemyValue = 100 * level
var enemySpeed = 5
var enemyHP = level
var bombHp = 10
var score = 0
var finalScore = 0
var finalLevel = 0
if (!localStorage.highScore) {
	localStorage.highScore = 0
}
if (!localStorage.highLevel) {
	localStorage.highLevel = 0
}
var game = true
var damage = 1
var splashR = 50
var weapon = 0
var charBomb = { "alive": false, "r": splashR, "damage": 3 }
var charHoming = { "alive": false, "speed": 2, "damage": 1 }
var charHp = 1
var maxCharHp = 1
var xpNeed = 1000
var scoreReset = true
var pause = false
var dead = false
var upgrade = false
var enemyImg = "idk lmao"
function drawControls() {
	scene.save()
	scene.globalAlpha = .2
	for (let i = 0; i < controls.length; i++) {
		scene.drawImage(controls[i].type, controls[i].x, controls[i].y, 50, 50)
		if (mouseClick) {
			if (mouseX >= controls[i].x && mouseX <= controls[i].x + 50 && mouseY >= controls[i].y && mouseY <= controls[i].y + 50) {
				switch (controls[i].type) {
					case upButton:
						uPressed = true
						break;
					case downButton:
						dPressed = true
						break;
					case shootButton:
						spPressed = true
						break;
				}
			}
		}
		else if (mouseReleased) {
			uPressed = false
			dPressed = false
			spPressed = false
			spReleased = true
			mouseReleased = false
		}
	}
	scene.restore()
}
// x,y is the point to test
// cx, cy is circle center, and radius is circle radius
function pointInCircle(x, y, cx, cy, radius) {
	var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
	return distancesquared <= radius * radius;
}

// return true if the rectangle and circle are colliding
function rectCircleColliding(cx, cy, r, x, y, w, h) {
	var distX = Math.abs(cx - x - w / 2);
	var distY = Math.abs(cy - y - h / 2);

	if (distX > (w / 2 + r)) { return false; }
	if (distY > (h / 2 + r)) { return false; }

	if (distX <= (w / 2)) { return true; }
	if (distY <= (h / 2)) { return true; }

	var dx = distX - w / 2;
	var dy = distY - h / 2;
	return (dx * dx + dy * dy <= (r * r));
}

function drawLasers() {
	scene.save()
	for (let i = 0; i < lasers.length; i++) {
		scene.fillStyle = lasers[i].color
		if (lasers[i].alive && !lasers[i].splash) {
			scene.fillRect(lasers[i].x, lasers[i].y, lasers[i].w, lasers[i].h)
			lasers[i].x += lasers[i].speed
			if(lasers[i].bomb && lasers[i].x<=0){
				lasers[i].alive = false
			}
			if (lasers[i].x > scrWidth && !lasers[i].evil) {
				lasers[i].alive = false
			}
			else if (lasers[i].x + laserW < 0) {
				lasers[i].alive = false
			}
			if (lasers[i].homing && lasers[i].evil && lasers[i].y > yPos) {
				lasers[i].y -= lasers[i].homing
			}
			else if (lasers[i].homing && lasers[i].evil && lasers[i].y < yPos && lasers[i].alive) {
				lasers[i].y += lasers[i].homing
			}
			else if (lasers[i].homing && !lasers[i].evil && enemies[enemies.length - 1] && lasers[i].y < enemies[enemies.length - 1].y && lasers[i].alive) {
				lasers[i].y += lasers[i].homing
			}
			else if (lasers[i].homing && !lasers[i].evil && enemies[enemies.length - 1] && lasers[i].y > enemies[enemies.length - 1].y && lasers[i].alive) {
				lasers[i].y -= lasers[i].homing
			}
			if (lasers[i].y >= scrHeight || lasers[i].y <= 0) {
				lasers[i].alive = false
			}
			if (lasers[i].x <= xPos + charWidth && lasers[i].x >= xPos && lasers[i].evil && lasers[i].alive) {
				if (lasers[i].y >= yPos && lasers[i].y <= yPos + charHeight) {
					if (!lasers[i].bomb) {
						lasers[i].alive = false
						charHp -= lasers[i].damage
						boom.currentTime = 0;
						scene.drawImage(explosion, xPos, yPos, charWidth, charHeight)
						boom.play()
						if (charHp <= 0) {
							game = false
							dead = true
						}
					} else if (lasers[i].bomb) { lasers[i].splash = true; lasers[i].alive = true }
				}
			}
			if (!lasers[i].alive && lasers[i].bomb && lasers[i].hp > 0) {
				lasers[i].alive = true
				lasers[i].splash = true
			}
			if (!lasers[i].alive) {
				// console.log(lasers[i])
				lasers.splice(i, 1)
			}
		}
		else if (lasers[i].splash && lasers[i].hp > 0) {
			scene.globalAlpha = lasers[i].hp / 10
			scene.beginPath()
			if (lasers[i].x - lasers[i].bomb < 0) {
				scene.arc(0 + lasers[i].bomb, lasers[i].y, lasers[i].bomb, 0, 2 * Math.PI)
			}
			else { scene.arc(lasers[i].x, lasers[i].y, lasers[i].bomb, 0, 2 * Math.PI) }
			scene.fill()
			if (rectCircleColliding(lasers[i].x, lasers[i].y, lasers[i].bomb, xPos, yPos, charWidth, charHeight) && lasers[i].hp > 0) {
				lasers[i].alive = false
				lasers[i].hp = 0
				// console.log("woa"+lasers[i].hp)
				charHp -= lasers[i].damage
				boom.currentTime = 0;
				scene.drawImage(explosion, xPos, yPos, charWidth, charHeight)
				boom.play()
				if (charHp <= 0) {
					game = false
					dead = true
				}
			}
			for (let j = 0; j < enemies.length; j++) {
				if (rectCircleColliding(lasers[i].x, lasers[i].y, lasers[i].bomb, enemies[j].x, enemies[j].y, enemyW, enemyH)) {
					enemies[j].hp -= lasers[i].damage
					if (enemies[j].hp <= 0) {
						enemies[j].alive = false
						score+=enemyValue
					}
				}
			}
			lasers[i].hp--
		}
		else if (lasers[i].hp < 1) {
			// console.log(lasers[i])
			lasers.splice(i, 1)
		}
	}
	scene.restore()
}

function drawEnemies() {
	for (let i = 0; i < enemies.length; i++) {
		if (level > 5) {
			enemyShootRate = 100 - level
			enemySpawnRate = 100 - level
		}
		enemyImg = eval("enemy" + enemies[i].type)
		scene.drawImage(enemyImg, enemies[i].x, enemies[i].y, enemyW, enemyH);
		enemies[i].x -= enemySpeed;
		if (Math.floor((Math.random() * enemyShootRate) + 1) == 1 && enemies[i].type > 1) {
			var laser = { "color": "#00FF00", "x": enemies[i].x, "y": enemies[i].y + (enemyH / 2), "w": laserW, "h": laserH, "alive": true, "evil": true, "damage": enemyDamage, "speed": -enemyLaserSpeed }
			switch (enemies[i].type) {
				case 3:
					laser.y = enemies[i].y
					var laser2 = { "color": "#00FF00", "x": enemies[i].x, "y": enemies[i].y + (enemyH), "w": laserW, "h": laserH, "alive": true, "evil": true, "damage": enemyDamage, "speed": -enemyLaserSpeed }
					lasers.unshift(laser2)
					break;
				case 4:
					laser["bomb"] = splashR
					laser["splash"] = false
					laser["hp"] = bombHp
					laser.w = bombS
					laser.h = bombS
					laser.color = "#00FFFF"
					break;
				case 5:
					laser["homing"] = enemyHomingSpeed
					laser.color = "#FF0000"
					break;
			}
			lasers.unshift(laser);

		}
		if ((enemies[i].x) < 0) {
			enemies[i].alive = false
			score -= enemyValue
		}
		for (let j = 0; j < lasers.length; j++) {
			if (lasers[j].x + lasers[j].w >= enemies[i].x && !lasers[j].evil && lasers[j].alive) {
				if (!lasers[j].splash) {
					if (lasers[j].y >= enemies[i].y && lasers[j].y <= enemies[i].y + enemyH) {
						if (!lasers[j].bomb) {
							lasers[j].alive = false
							enemies[i].hp -= lasers[j].damage
							if (enemies[i].hp <= 0) {
								enemies[i].alive = false
								score += enemyValue
							}
						} else if (lasers[j].bomb) { lasers[j].splash = true }
					}
				}
				else if (lasers[j].splash) {
					if (rectCircleColliding(lasers[j].x, lasers[j].y, lasers[j].bomb, enemies[i].x, enemies[i].y, enemyW, enemyH)) {
						lasers[j].alive = false
						enemies[i].hp -= lasers[j].damage
						if (enemies[i].hp <= 0) {
							enemies[i].alive = false
							score += enemyValue
						}
					}
				}
			}
		}
		if (xPos + charWidth >= enemies[i].x && xPos <= enemies[i].x + enemyW && enemies[i].alive) {
			if (yPos >= enemies[i].y && yPos <= [enemies[i].y + enemyH]) {
				enemies[i].alive = false
				charHp--
				if (charHp <= 0) {
					game = false
					dead = true
				}
			}
		}
		if (!enemies[i].alive) {
			boom.currentTime = 0;
			boom.play()
			scene.drawImage(explosion, enemies[i].x, enemies[i].y, enemyW, enemyH)
			enemies.splice(i, 1)
		}
	}
}

function drawScene() {
	scene.canvas.width = window.innerWidth
	scene.canvas.height = window.innerHeight
	scrWidth = window.innerWidth
	scrHeight = window.innerHeight
	charWidth = scrWidth / screenToShip
	charHeight = scrHeight / screenToShip
	enemyW = charWidth * 1.5
	enemyH = charHeight * 1.5
	if (game) {
		scene.canvas.height = window.innerHeight
		scrWidth = window.innerWidth
		scrHeight = window.innerHeight
		scene.clearRect(0, 0, scrWidth, scrHeight)
		scene.drawImage(bkgnd, bkgndX, 0, scrWidth, scrHeight);
		scene.drawImage(bkgnd, bkgndX + scrWidth, 0, scrWidth, scrHeight);
		bkgndX -= scrollSpeed;
		// console.log(bkgndX)
		enemyValue = 100 * level
		enemySpeed = 5
		enemyHP = level
		if (bkgndX < -1 * scrWidth) {
			bkgndX = 0;
		}
		scene.font = "20px Verdana";
		scene.fillStyle = "#FFFFFF"
		scene.textAlign = "left"
		score = Math.round(score)
		xpNeed = Math.round(xpNeed)
		if (skipped) {
			scene.fillText("Cheat: " + score + " Level: " + level + "(" + (xpNeed - score) + " till next level)", 50, 50)
		} else {
			scene.fillText("Score: " + score + " Level: " + level + "(" + (xpNeed - score) + " till next level)", 50, 50)
		}
		scene.fillText("❤️".repeat(charHp), 50, 70)
		scene.fillText("♡".repeat(maxCharHp - charHp), 50 + (30 * charHp), 70)
		scene.drawImage(ship, xPos, yPos, charWidth, charHeight)
		drawLasers()
		if (window.mobileAndTabletCheck()) {
			drawControls()
		}
		if (uPressed) {
			if (yPos < 0) {
				yPos = scrHeight - charHeight
			}
			else {
				yPos -= charSpeed
			}
		}
		if (dPressed) {
			if (yPos > scrHeight - charHeight) {
				yPos = 0
			}
			else {
				yPos += charSpeed
			}
		}
		if (spPressed) {
			if (spReleased) {
				var laser = { "color": "#00FF00", "x": xPos + charWidth, "y": yPos + (charHeight / 2), "w": laserW, "h": laserH, "alive": true, "evil": false, "damage": damage, "speed": laserSpeed }
				switch (weapon) {
					case 1:
						laser["bomb"] = charBomb.r
						laser["splash"] = false
						laser["hp"] = bombHp
						laser.w = bombS
						laser.h = bombS
						laser.color = "#00FFFF"
						laser.damage = charBomb.damage
						break;
					case 2:
						laser["homing"] = charHoming.speed
						laser.color = "#FF0000"
						laser.damage = charHoming.damage
						break;
				}
				lasers.unshift(laser);
				pew.currentTime = 0;
				pew.play()
				spReleased = false
			}
		}
		if (escPressed) {
			if (escReleased) {
				game = false
				pause = true
				escReleased = false
			}
		}
		if (ePressed) {
			if (eReleased) {
				if (charBomb.alive && weapon == 0) {
					weapon = 1
				}
				else if (charHoming.alive && weapon == 1) {
					weapon = 2
				}
				else if (weapon == 2) {
					weapon = 0
				}
				else if (weapon == 1 && !charHoming.alive) {
					weapon = 0
				}
				else if (weapon = 0 && !charBomb.alive && charHoming.alive) {
					weapon = 2
				}
				// console.log(weapon)
				eReleased = false
			}
		}
		if (Math.floor((Math.random() * enemySpawnRate) + 1) == 1) {
			var enemy = { "x": scrWidth, "y": Math.floor((Math.random() * (scrHeight - enemyH))), "hp": enemyHP, "alive": true }
			if (level < 6) {
				enemy["type"] = level
			}
			else {
				enemy["type"] = Math.floor(Math.random() * 5) + 1
			}
			enemies.unshift(enemy);
		}
		if (score >= xpNeed) {
			upgrade = true
			xpNeed += Math.floor(xpNeed * 1.1) //fix
			skillPoints++
			level++
			game = false
		}
		drawEnemies()
	}
	else if (pause) {
		scene.save()
		scene.fillStyle = "#e48aff"
		scene.fillRect(0, 0, scrWidth, scrHeight)
		scene.font = "30px Verdana"
		scene.fillStyle = "black"
		scene.textAlign = "center"
		scene.fillText("Paused - click to unpause", scrWidth / 2, 30)
		if (mouseClick) {
			if (mouseReleased) {
				pause = false
				escReleased = false
				game = true
			}
		}
		scene.restore()
	}
	else if (upgrade) {
		scene.save()
		scene.fillStyle = "#e48aff"
		scene.fillRect(0, 0, scrWidth, scrHeight)
		scene.fillStyle = "black"
		scene.font = "30px Verdana"
		scene.textAlign = "center"
		scene.fillText("Level Up! Pick a skill!", scrWidth / 2, 30)
		enemies = []
		lasers = []
		charHp = maxCharHp
		for (let i = 0; i < skills.length; i++) {
			scene.save()
			scene.beginPath()
			if (!skills[i].alive) {
				scene.globalAlpha = .4
			}
			scene.arc(scrWidth / 4 * skills[i].side, scrHeight - skills[i].tier * 50, 20, 0, 2 * Math.PI)
			scene.stroke()
			if (pointInCircle(mouseX, mouseY, scrWidth / 4 * skills[i].side, scrHeight - skills[i].tier * 50, 20)) {
				scene.beginPath()
				scene.arc(scrWidth / 4 * skills[i].side, scrHeight - skills[i].tier * 50, 20, 0, 2 * Math.PI)
				scene.fillStyle = "#A1FFBA"
				scene.fill()
				scene.globalAlpha = .9
				scene.fillText(skills[i].info, scrWidth / 2, 60)
				scene.globalAlpha = .4
				if (mouseClick && skills[i].alive) {
					skills[i].effect()
					upgrade = false
					mouseReleased = false
					game = true
					try {
						for (let j = 0; j < skills.length; j++) {
							if (skills[j].side == skills[i].side) {
								if (skills[j].tier == skills[i].tier + 1) {
									skills[j].alive = true
								}
							}
						}
					}
					catch {
						console.log("no")
					}
					finally {
						if (skills[i].side < 1) {
							skills[i].alive = true
						}
						else {
							skills[i].alive = false
						}
					}

				}

			}
			scene.restore()
		}
	}
	else if (dead) {
		scene.save()
		scene.clearRect(0, 0, scrWidth, scrHeight)
		scene.canvas.width = window.innerWidth
    scene.fillRect(0, 0, scrWidth, scrHeight)
		if (scoreReset) {
			if (score > localStorage.highScore && !skipped) {
				localStorage.highScore = score
			}
			if (level > localStorage.highLevel && !skipped) {
				localStorage.highLevel = level
			}
			finalScore = score
			finalLevel = level
			score = 0
			level = 1
			xpNeed = 1000
			scoreReset = false
		}
		enemyShootRate = 100
		enemySpawnRate = 100
		enemies = []
		lasers = []
		clearInterval(holdToFire)
		clearInterval(regen)
		skills = skillsInit.map(object => ({ ...object }))
		charBomb = { "alive": false, "r": splashR, "damage": 3 }
		charHoming = { "alive": false, "speed": 2, "damage": 1 }
		weapon = 0
		charHp = 1
		maxCharHp = 1
		charSpeed = 5
		damage = 1
		enemyDamage = 1
		yPos = scrHeight / 4.705
		xPos = scrWidth / 38.4
		scene.font = "50px Verdana"
		scene.fillStyle = "#FF0000"
		scene.textAlign = "center"
		scene.fillText("GAME OVER", scrWidth / 2, scrHeight / 2)
		scene.font = "30px Verdana"
		scene.fillText("Final Score: " + finalScore + "(Level " + finalLevel + ")", scrWidth / 2, scrHeight / 2 + 50)
		scene.fillText("High Score: " + localStorage.highScore + "(Level " + localStorage.highLevel + ")", scrWidth / 2, scrHeight / 2 + 100)
		scene.fillText("Click to play again", scrWidth / 2, scrHeight / 2 + 150)
		setTimeout(() => {
			if (mouseClick) {
				skipped = false
				game = true
				scoreReset = true
				dead = false
			}
		}, 1000);
		scene.restore()
	}
	window.requestAnimationFrame(drawScene)
}



drawScene()