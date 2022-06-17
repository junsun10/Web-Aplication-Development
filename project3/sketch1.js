let isgameover = false;
let player_x = 100;
let player_y = 100;
let score = 0;
let time = 0;
let balls = []

function preload(){
  soundFormats('mp3','wav','ogg');
  bgm = loadSound('./data/gameBGM.wav');
  gameover = loadSound('./data/gameover.wav');
  Dot = loadFont('./data/DOTFONT-.TTF');
}

function setup() {
  var container = createCanvas(1000, 600);
  container.parent('container');
  
  background(0);

  // initial balls
  let temp
  for(let i=0; i<30; i++){
   temp = new Ball();
   append(balls, temp); 
  }
  
  bgm.setVolume(0.2);
  bgm.loop();
  textFont(Dot);

}

function draw() {
  background(0);
  
  drawPlayer(player_x,player_y);

  if (isgameover!=true){
    if (player_x >= width-2.5){
      player_x = width-2.5;
    }
    if (player_y >= height-2.5){
      player_y = height-2.5;
    }
    if (player_x <= 2.5){
      player_x = 2.5;
    }
    if (player_y <= 2.5){
      player_y = 2.5;
    }

    if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)){
      player_x += 3;
      player_y -= 3;
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)){
      player_x += 3;
      player_y += 3;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)){
      player_x -= 3;
      player_y -= 3;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)){
      player_x -= 3;
      player_y += 3;
    } else if (keyIsDown(RIGHT_ARROW)) {
      player_x += 3;
    } else if (keyIsDown(LEFT_ARROW)) {
      player_x -= 3;
    } else if (keyIsDown(UP_ARROW)) {
      player_y -= 3;
    } else if (keyIsDown(DOWN_ARROW)) {
      player_y += 3;
    } 

    for(let i=0;i<30;i++){
      balls[i].move();
      balls[i].display();
    }
    printScore();
  } else {
    drawPlayer(player_x,player_y);
    printScore();
    info();
    textSize(40);
    text("Game Over",340,300);
    for(let i=0;i<30;i++){
      balls[i].display();
    }
  }

  info();
  if (abs(mouseX - 970)<=15 & abs(mouseY-30)<=15){
    infoContents();
  } else {
    
  }
}

function printScore(){
  textSize(30);
  if ( time % 100 == 0 & isgameover!=true){
    score += 1;
  }
  time += 1
  text("Score : "+score,20,40);
}

function drawPlayer(x,y){
  stroke(0);
  fill(255,0,0);
  circle(x,y,7);
  fill(255);
}

function info(){
  stroke(255);
  fill(0);
  circle(970,30,30);
  fill(255);
  textSize(20);
  text('?',963,38);
}

function infoContents(){
  fill(255);
  rect(200,100,600,400,10);
  textFont('Helvetica');
  fill(0);
  let infoy = 150;
  let infox = 230;
  textSize(25);
  text("게임 설명",infox,infoy);
  textSize(16);
  text("플레이어를 움직여 최대한 살아남으세요!",infox,infoy+40);
  textSize(25);
  text("조작 설명",infox,infoy+100);
  textSize(16);
  text("방향키",infox,infoy+140);
  textFont('Dot');
}

class Ball {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = 7;
    this.movex = int(random(-5,5));
    if (this.movex == 0){
      this.movex = 2;
    }
    this.movey = int(random(-5,5));
    if (this.movey == 0){
      this.movey = 2;
    }
  }

  move() {

    this.movex *= 1.0005;
    this.movey *= 1.0005;

    if(abs(this.x - player_x) < 5 && abs(this.y - player_y) < 5){
      
      // textSize(40);
      // text("Game Over",340,300);
      console.log(abs(this.x - player_x),abs(this.y - player_y));
      gameover.setVolume(0.2);
      gameover.play();
      bgm.stop();
      isgameover = true;
      // noLoop();
    }
    if (this.x > width - this.r || this.x < this.r) {
      this.movex *= -1;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.movey *= -1;
    }
    this.x += this.movex;
    this.y += this.movey;
  }
  display(){
    circle(this.x,this.y,this.r);
  }
}