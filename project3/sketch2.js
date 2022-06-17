let isgameover = false;
let player_x = 500;
let player_y = 580;
let score = 0;
let time = 0;
let life = 3;
let Fs = [];
let As = [];
let egg = 0;

function preload(){
  soundFormats('mp3','wav','ogg');
  bgm = loadSound('./data/gameBGM.wav');
  gameover = loadSound('./data/gameover.wav');
  lifeminus = loadSound('./data/wall.wav');
  lifeplus = loadSound('./data/gamewin.wav');
  eggbgm = loadSound('./data/eggbgm.wav');
  Dot = loadFont('./data/DOTFONT-.TTF');
}

function setup() {
  var container = createCanvas(1000, 600);
  container.parent('container');
  noStroke();
  background(0);

  // initial balls
  let temp
  for(let i=0; i<30; i++){
   temp = new F();
   append(Fs, temp); 
  }
  for(let i=0; i<3; i++){
    temp = new A();
    append(As, temp); 
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
    if (player_x <= 2.5){
      player_x = 2.5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      player_x += 4;
    } else if (keyIsDown(LEFT_ARROW)) {
      player_x -= 4;
    }

    for(let i=0;i<30;i++){
      Fs[i].move();
      Fs[i].display();
    }
    for(let i=0;i<3;i++){
      As[i].move();
      As[i].display();
    }
    printScore();
  }  else if (isgameover & egg == 2){
    background(0);
    background(255,0,0);
    textSize(40);
    text("ERR",200,300);
    text("ERR",400,200);
    text("ERR",300,400);
    text("ERR",500,100);
    text("ERR",550,300);
    text("ERR",600,500);
    eggbgm.setVolume(0.05);
    eggbgm.play();
  } else {
    background(0);
    drawPlayer(player_x,player_y);
    printScore();
    info();
    textSize(40);
    text("Game Over",340,300);
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
  fill(255);
  text("Score : "+score,20,40);
  for(let i=0; i<3; i++){
      if(life<i+1){
        fill(255);
        stroke(255);
        heart(840+i*40,22,20);
      } else {
        fill(255,0,0);
        stroke(255,0,0);
        heart(840+i*40,22,20);
      }
  }
}

function heart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }

function drawPlayer(x,y){
  fill(255);
  circle(x,y,10);
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
  text("목숨은 세개입니다.",infox,infoy+40);
  text("플레이어를 움직여 F학점을 피하세요!",infox,infoy+80);
  text("A학점을 먹으면 목숨이 한개 늘어납니다.",infox,infoy+120);
  textSize(25);
  text("조작 설명",infox,infoy+180);
  textSize(16);
  text("좌우 방향키",infox,infoy+220);
  textFont('Dot');
}

class F {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.h = 5;
    this.fontsize = random(15,30);
    this.movey = random(4,10);
  }
  move() {
    if(abs(this.x-player_x) <= (this.fontsize+10)/2+5 && abs(this.y-player_y) <= (this.fontsize+10)/2+5){
      this.y = 0;
      life -= 1;
      lifeminus.play();
      printScore();
      if (life == 0){
        // noLoop();
        // background(0);
        // printScore();
        // textSize(40);
        // text("Game Over",340,300);
        gameover.setVolume(0.2);
        gameover.play();
        bgm.stop();
        isgameover = true;
      } 
    }
    this.y += this.movey;

    if (this.y > height + (this.fontsize+10)/2) {
      this.y = 0;
      this.x = random(width);
    }
  }
  display(){
    textSize(this.fontsize);
    fill(255,0,0);
    stroke(255,0,0);
    circle(this.x,this.y,this.fontsize+10);
    fill(255);
    text("F",this.x-this.fontsize/3,this.y-this.fontsize/3,this.x,this.y);
  }
}

class A {
    constructor() {
      this.x = random(width);
      this.y = 0;
      this.h = 5;
      this.fontsize = random(15,30);
      this.movey = random(3,7);
    }
    move() {
      if(abs(this.x-player_x) <= (this.fontsize+10)/2+5 && abs(this.y-player_y) <= (this.fontsize+10)/2+5){
        this.x = random(width);
        this.y = 0;
        if (life < 3){
          life += 1;
          egg = 0;
          lifeplus.play();
        } else if (life >= 3) {
          egg += 1;
          lifeplus.play();
        }
        if (egg == 2){
          bgm.stop();
          
          isgameover = true;
        }
        printScore();
      }

      this.y += this.movey;
  
      if (this.y > height) {
        this.y = 0;
        this.x = random(width);
      }
    }
    display(){
      textSize(this.fontsize);
      fill(255);
      stroke(255);
      circle(this.x,this.y,this.fontsize+10);
      fill(255,0,0);
      text("A",this.x-this.fontsize/3,this.y-this.fontsize/3,this.x,this.y);
    }
  }