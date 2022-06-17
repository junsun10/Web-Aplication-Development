let position_x = 200;
let position_y = 200;
let movex = 2;
let movey = 2;

function preload(){
  soundFormats('mp3','wav','ogg');
  wall = loadSound('./data/wall.wav');
  gamewin = loadSound('./data/gamewin.wav');
  bgm = loadSound('./data/gameBGM.wav');
  Dot = loadFont('./data/DOTFONT-.TTF');
}

function setup() {
  var container = createCanvas(1000, 600);
  container.parent('container');
  noStroke();
  background(0);

  bgm.setVolume(0.2);
  bgm.loop();
  textFont(Dot);
}

function draw() {
  background(0);
  welcome();
}

function welcome(){
  fill(255);
  textSize(20);
  if (position_x > width - 300 || position_x < 0){
    movex *= -1;
    wall.play();
  }
  if (position_y > height || position_y < 20){
    movey *= -1;
    wall.play();
  }
  position_x += movex;
  position_y += movey;
  text("Welcome to Mini Game",position_x,position_y);
}