let table;
let facebook_img;
let twitter_img;
let pinterest_img;
let snapchat_img;
let count_row = 0;
let select_date;

function preload(){
  // table = loadTable('data/social media stocks 2012-2022.csv','csv','header');
  table = loadTable('data/change.csv','csv','header');
  facebook_img = loadImage('data/f0.png');
  twitter_img = loadImage('data/t0.png');
  pinterest_img = loadImage('data/p0.png');
  snapchat_img = loadImage('data/s0.png');
}

function setup() {
  createCanvas(1500,900);
  draw_all(0);
}

function draw() {
  if(80<=mouseX & mouseX<=828 & 460<=mouseY & mouseY<=850){
    draw_all(count_row);
    text(table.getString(int((mouseX-80)*(1)*4),0),mouseX-45,880);
    stroke('white');
    setLineDash([5,5]);
    line(mouseX,460,mouseX,850);
    stroke('black');
    setLineDash([0,0]);
  } else {
    // draw_all(count_row);
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed(){
  if(80<=mouseX & mouseX<=828 & 460<=mouseY & mouseY<=850){
    let temp = (mouseX-80)*(1.25);
    print(temp,temp*4);
    count_row = int((mouseX-80)*(1)*4);
    draw_all(count_row);
  }
}

function draw_title(){
  let x = 100;
  fill(255);
  textSize(32);
  text('Major social media stock prices',x,90);
  textSize(15);
  text('(2019.04 ~ 2022.04)',x+480,90);
}

function draw_icon(rnum){
  //max:382.1799927 21-9-7
  print(rnum);
  image(facebook_img,950,150,map(table.getNum(rnum,2),0,383,50,400),map(table.getNum(rnum,2),0,383,50,400));
  image(twitter_img,1320,150,map(table.getNum(rnum+1,2),0,383,50,400),map(table.getNum(rnum+1,2),0,383,50,400));
  image(pinterest_img,870,450,map(table.getNum(rnum+2,2),0,383,50,400),map(table.getNum(rnum+2,2),0,383,50,400));
  image(snapchat_img,1320,450,map(table.getNum(rnum+3,2),0,383,50,400),map(table.getNum(rnum+3,2),0,383,50,400));
}

function draw_graph(rnum){
  // let x = 1000;
  let x = 200;
  let y = 200;
  let h = 40;

  // write date
  fill(255);
  textSize(20);
  text(table.getString(rnum,0),x,y-30);
  
  // draw graph
  rect(x,y,table.getNum(rnum,2),h);
  rect(x,y+60,table.getNum(rnum+1,2),h);
  rect(x,y+120,table.getNum(rnum+2,2),h);
  rect(x,y+180,table.getNum(rnum+3,2),h);

  // write text
  textSize(20);
  text('Facebook',x-100,y+26);
  text('Twitter',x-100,y+60+26);
  text('Pinterest',x-100,y+120+26);
  text('Snapchat',x-100,y+180+26);
  text('$'+int(table.getString(rnum,2)),x+table.getNum(rnum,2)+10,y+26);
  text('$'+int(table.getString(rnum+1,2)),x+table.getNum(rnum+1,2)+10,y+60+26);
  text('$'+int(table.getString(rnum+2,2)),x+table.getNum(rnum+2,2)+10,y+120+26);
  text('$'+int(table.getString(rnum+3,2)),x+table.getNum(rnum+3,2)+10,y+180+26);
}

function draw_select(now){
  select_date = createSelect();
  select_date.position(325,154);
  // load year-month
  for(let i=4;i<13;i++){
    if(i<10){
      select_date.option('2019-0'+i);
    } else {
      select_date.option('2019-'+i);
    }
  }
  for(let i=2020;i<2022;i++){
    for(let j=1;j<13;j++){
      if(j<10){
        select_date.option(i+'-0'+j);
      } else {
        select_date.option(i+'-'+j);
      }
    }
  }
  for(let i=1;i<5;i++){
    select_date.option('2022-0'+i);
  }

  let temp = table.getString(now,0).slice(0,7);
  select_date.selected(temp);
  select_date.changed(select_event);
}

function select_event() {
  let item = select_date.value();
  let year = item.slice(0,4);
  let month = item.slice(5,7);
  let row;
  for(let i=1;i<31;i++){
    if(i<10){
      row = table.findRow(year+'-'+month+'-0'+i,'Date');
    } else {
      row = table.findRow(year+'-'+month+'-'+i,'Date');
    }
    if(row==null){
      continue;
    } else {
      break;
    }
  }
  print(row);
  print(row.getString(8));
  count_row = row.getNum(8);
  draw_all(count_row);
}

function draw_monthgraph(now){
  if (now==0) {
    stroke(57, 69, 233);
  } else if (now==1){
    stroke(57, 204, 0);
  } else if (now==2){
    stroke('red');
  } else if (now==3){
    stroke(247,243,4);
  }

  let x = 80;
  let y = 850;
  let long = 1;
  let before_temp;
  let temp;
  temp = table.getNum(now,2);
  before_temp = temp;
  strokeWeight(1);
  point(x,y-temp);
  for(let i=1;i<749;i++){
    before_temp = temp;
    temp = table.getNum(i*4+now,2);
    line(x+(i-1)*long,y-before_temp,x+i*long,y-temp);
    point(x+i*long,y-temp);
  }
}

function write_monthgraph_info(){
  let x = 100;
  let y = 500;
  textSize(18);
  stroke(57, 69, 233);
  fill(57, 69, 233);
  text('Facebook',x,y);
  stroke(57, 204, 0);
  fill(57, 204, 0);
  text('Twitter',x,y+30);
  stroke('red');
  fill('red');
  text('Pinterest',x,y+60);
  stroke(247,243,4);
  fill(247,243,4);
  text('Snapchat',x,y+90);
  stroke('black');
  fill('white');
}

function draw_vertical(rnum){
  let x = 80;
  let long = 1;
  stroke('white');
  line(x+int(rnum/4)*long,460,x+int(rnum/4)*long,850);
  stroke('black');
}



function howtouse(){
  let x = 950;
  let y = 640;
  textSize(20);
  text('How to use',x,y);
  text('Dataset from kaggle',x+300,y+220);
  textSize(18);
  text('Press arrow key to move',x,y+40);
  text('Select the month you want to see',x,y+80);
  text('Click the chart where you want to see',x,y+120);
}

function draw_all(now_row){
  background(50);
  stroke('black');
  draw_title();
  draw_icon(now_row);
  draw_graph(now_row);
  draw_select(now_row);
  draw_monthgraph(0);
  draw_monthgraph(1);
  draw_monthgraph(2);
  draw_monthgraph(3);
  draw_vertical(now_row);
  write_monthgraph_info();
  howtouse();
}


function keyPressed() {
  if (keyCode===RIGHT_ARROW & count_row<=2988) {
    count_row += 4;
    draw_all(count_row);
  } else if (keyCode===LEFT_ARROW & count_row>=4) {
    count_row -= 4;
    draw_all(count_row);
  } else if (keyCode===UP_ARROW & count_row<=2912) {
    count_row += 80;
    draw_all(count_row);
  } else if (keyCode===UP_ARROW & count_row>2912) {
    count_row = 2992;
    draw_all(count_row);
  } else if (keyCode===DOWN_ARROW & count_row>=80) {
    count_row -= 80;
    draw_all(count_row);
  } else if (keyCode===DOWN_ARROW & count_row<80) {
    count_row = 0;
    draw_all(count_row);
  }
}

// chart, mouseon show prices