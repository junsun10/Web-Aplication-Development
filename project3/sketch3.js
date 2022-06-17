let gameover = false;
let winner = 0;
let player1_x = 5;
let player1_y = 275;
let player2_x = 985;
let player2_y = 275;
let speed = 7;
let W = 87;
let S = 83;
let A = 65;
let D = 68;
let ball;
let rainbow = [[255,0,0],[255,127,0],[204,204,0],[0,255,0],[0,0,255],[127,0,255]];
let rainbowcount = 0;

function preload(){
  soundFormats('mp3','wav','ogg');
  bgm = loadSound('./data/gameBGM.wav');
  wall = loadSound('./data/wall.wav');
  gamewin = loadSound('./data/gamewin.wav');
  Dot = loadFont('./data/DOTFONT-.TTF');
}

function setup() {
  var container = createCanvas(1000, 600);
  container.parent('container');
  noStroke();
  background(0);
  ball = new Ball();
  textFont(Dot);
  
  bgm.setVolume(0.2);
  bgm.loop();
}

function draw() {
  background(rainbow[rainbowcount][0],rainbow[rainbowcount][1],rainbow[rainbowcount][2]);
  
  

  if(gameover!=true){
    drawGoalpost();
    drawPlayer1(player1_x,player1_y);
    drawPlayer2(player2_x,player2_y);

    if (player1_x >= width/2-10){
      player1_x = width/2-10;
    }
    if (player1_y >= height-52.5){
      player1_y = height-52.5;
    }
    if (player1_x <= 2.5){
      player1_x = 2.5;
    }
    if (player1_y <= 2.5){
      player1_y = 2.5;
    }

    if (player2_x >= width-12.5){
      player2_x = width-12.5;
    }
    if (player2_y >= height-52.5){
      player2_y = height-52.5;
    }
    if (player2_x <= width/2){
      player2_x = width/2;
    }
    if (player2_y <= 2.5){
      player2_y = 2.5;
    }

    if (keyIsDown(D) && keyIsDown(W)){
      player1_x += speed;
      player1_y -= speed;
    } else if (keyIsDown(D) && keyIsDown(S)){
      player1_x += speed;
      player1_y += speed;
    } else if (keyIsDown(A) && keyIsDown(W)){
      player1_x -= speed;
      player1_y -= speed;
    } else if (keyIsDown(A) && keyIsDown(S)){
      player1_x -= speed;
      player1_y += speed;
    } else if (keyIsDown(D)) {
      player1_x += speed;
    } else if (keyIsDown(A)) {
      player1_x -= speed;
    } else if (keyIsDown(W)) {
      player1_y -= speed;
    } else if (keyIsDown(S)) {
      player1_y += speed;
    }

    if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)){
      player2_x += speed;
      player2_y -= speed;
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)){
      player2_x += speed;
      player2_y += speed;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)){
      player2_x -= speed;
      player2_y -= speed;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)){
      player2_x -= speed;
      player2_y += speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      player2_x += speed;
    } else if (keyIsDown(LEFT_ARROW)) {
      player2_x -= speed;
    } else if (keyIsDown(UP_ARROW)) {
      player2_y -= speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      player2_y += speed;
    } 

    ball.move();
    ball.display();
  } else {
    drawGoalpost();
    drawPlayer1(5,275);
    drawPlayer2(985,275);
    info();
    textSize(40);
    if (winner == 0){
      text("Player 1 Win",320,310);
    } else {
      text("Player 2 Win",320,310);
    }
  }

  info();
  
  if (abs(mouseX - 970)<=15 & abs(mouseY-30)<=15){
    infoContents();
  } else {
  }
}

function drawPlayer1(x,y){
  fill(255);
  rect(x,y,10,50);
}

function drawPlayer2(x,y){
  fill(255);
  rect(x,y,10,50);
}

function drawGoalpost(){
  strokeWeight(2);
  stroke(255);
  fill(rainbow[rainbowcount][0],rainbow[rainbowcount][1],rainbow[rainbowcount][2]);
  rect(0,250,20,100);
  rect(980,250,20,100);
  circle(500,300,100);
  fill(255)
  line(500,0,500,600);
}

function info(){
  stroke(255);
  fill(rainbow[rainbowcount][0],rainbow[rainbowcount][1],rainbow[rainbowcount][2]);
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
  text("플레이어를 움직여 상대 골대에 공을 넣으면 승리합니다.",infox,infoy+40);
  textSize(25);
  text("조작 설명",infox,infoy+100);
  textSize(16);
  text("player1: w a s d",infox,infoy+140);
  text("player2: 방향키",infox,infoy+180);
  textFont('Dot');
}

class Ball {
  constructor() {
    this.x = 300;
    this.y = 175;
    this.r = 10;
    this.movex = 6;
    this.movey = 6;
  }

  move() {

    if (this.x <= 5 && (250 <= this.y && this.y <= 350)){
      // background(rainbow[rainbowcount][0],rainbow[rainbowcount][1],rainbow[rainbowcount][2]);
      // drawGoalpost();
      // drawPlayer1(5,275);
      // drawPlayer2(985,275);
      // info();
      // textSize(40);
      // text("Player 2 Win",320,310);
      gamewin.play();
      bgm.stop();
      winner = 1;
      gameover = true;
      // noLoop();
    }
    if (995 <= this.x && (250 <= this.y && this.y <= 350)){
      // background(rainbow[rainbowcount][0],rainbow[rainbowcount][1],rainbow[rainbowcount][2]);
      // drawGoalpost();
      // drawPlayer1(5,275);
      // drawPlayer2(985,275);
      // info();
      // textSize(40);
      // text("Player 1 Win",320,310);
      gamewin.play();
      bgm.stop();
      gameover = true;
      // noLoop();
    }

    if((player1_x - 5 <= this.x && this.x <= player1_x + 15) && (player1_y - 5 <= this.y && this.y <= player1_y + 55)){
      this.movex *= -1;
      wall.play();
    }
    if((player2_x - 5 <= this.x && this.x <= player2_x + 15) && (player2_y - 5 <= this.y && this.y <= player2_y + 55)){
      this.movex *= -1;
      wall.play();
    }
    
    if (this.x > width - this.r/2 || this.x < this.r/2) {
      this.movex *= -1;
      wall.play();
      rainbowcount += 1;
      if(rainbowcount == 6){
        rainbowcount = 0;
      }
    }
    if (this.y > height - this.r/2 || this.y < this.r/2) {
      this.movey *= -1;
      wall.play();
      rainbowcount += 1;
      if(rainbowcount == 6){
        rainbowcount = 0;
      }
    }

    this.x += this.movex;
    this.y += this.movey;
    
  }
  display(){
    fill(255);
    circle(this.x,this.y,this.r);
  }
}