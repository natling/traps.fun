class Player {

	constructor(x, y, size, colorOn, colorOff) {
		this.x        = x;
		this.y        = y;
		this.size     = size;
		this.colorOn  = colorOn;
		this.colorOff = colorOff;
	}

	display() {
		noStroke();

		if (gameOver) {
			fill(this.colorOn);
		} else if (t % 2 == 0) {
			fill(this.colorOn);
		} else {
			fill(this.colorOff);
		}

		rect(this.x, this.y, this.size, this.size);
	}
}

var t = 0;

var gridWidth  = 20;
var gridHeight = 25;
var playerSize =  4;
var goalSize   = 10;

var backgroundColor = '#000000';
var mazeColor       = '#00FF00';
var playerColor     = '#FF0000';
var goalColor       = '#4477FF';

var collisionFrequency = 440;
var collisionAnnoyance =  10;
var stepFrequency      = 200;
var stepAnnoyance      =  50;

var gameOver = false;

var player, goal, maze;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();
	background(backgroundColor);
	frameRate(10);

	player = new Player(random(width), random(height), playerSize, playerColor, backgroundColor);
	goal   = new Player(random(width), random(height), goalSize, goalColor, backgroundColor);

	for (var j = 0; j < Math.floor(height / gridHeight); j++) {
		for (var i = 0; i < Math.floor(width / gridWidth); i++) {
			cell(i * gridWidth, j * gridHeight, gridWidth, gridHeight, 1);
		}
	}

	loadPixels();
	maze = pixels;
}

function draw() {
	for (var i = 0; i < pixels.length; i++) {
		pixels[i] = maze[i];
	}

	updatePixels();

	player.display();
	goal.display();

	t++;
}

function cell(x, y, w, h, strokes) {
	var corners = [[x, y], [x + w, y], [x, y + h], [x + w, y + h]];

	strokeWeight(1);
	stroke(mazeColor);

	for (var j = 0; j < strokes; j++) {
		shuffleArray(corners);
		line(corners[0][0], corners[0][1], corners[1][0], corners[1][1]);
	}
}

function keyPressed() {
	if (! gameOver) {
		var newXY = [player.x, player.y];

		switch (keyCode) {
			case UP_ARROW:
				newXY = [player.x, player.y - player.size];
				break;
			case DOWN_ARROW:
				newXY = [player.x, player.y + player.size];
				break;
			case LEFT_ARROW:
				newXY = [player.x - player.size, player.y];
				break;
			case RIGHT_ARROW:
				newXY = [player.x + player.size, player.y];
				break;
		}

		var collision = false;
		var win       = false;

		var newPixels = get(newXY[0], newXY[1], player.size, player.size);
		newPixels.loadPixels();

		for (var i = 1; i < newPixels.pixels.length; i += 4) {
			pixelIsGreen = newPixels.pixels[i] != 0;

			if (pixelIsGreen) {
				collision = true;
			}
		}

		for (var i = 2; i < newPixels.pixels.length; i += 4) {
			pixelIsBlue = newPixels.pixels[i] != 0;

			if (pixelIsBlue) {
				win = true;
			}
		}

		if (win) {
			gameOver = true;
			odeToJoy();
		} else if (! collision) {
			player.x = newXY[0];
			player.y = newXY[1];

			var sound = new p5.Oscillator();

			if (coin(0.15)) {
				var freqOffset = randomFloat(-stepAnnoyance, stepAnnoyance);
			} else {
				var freqOffset = 0;
			}

			sound.setType('sine');
			sound.freq(stepFrequency + freqOffset);
			sound.start();
			sound.stop(0.1);
		} else {
			var sound = new p5.Oscillator();
			var freqOffset = randomFloat(-collisionAnnoyance, collisionAnnoyance);

			sound.setType('sawtooth');
			sound.freq(collisionFrequency + freqOffset);
			sound.start();
			sound.stop(0.2);
		}
	}
}

function odeToJoy() {
	var notes = [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64];
	var durations = [];
	var time = 0;

	for (var i = 0; i < notes.length; i++) {
		durations.push(time);
		time += randomFloat(0.4, 0.6);
	}

	for (var i = 0; i < notes.length; i++) {
		var sound = new p5.Oscillator();
		sound.setType('square');
		sound.freq(midiToFreq(notes[i]));
		sound.start(durations[i]);
		if (i < notes.length - 1) {
			sound.stop(durations[i + 1] - 0.05);
		}
	}
}