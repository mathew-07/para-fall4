var background1,backgroundimage
var plane,planeimage;
var stephany,stephanyimage;
var parachute,parachuteimage;
var score;
var parachutegroup;
var birds,birdsimage;
var birdsGroup;
var gameover,gameoverimage;
var restart, restartimage;
var play=1;
var end=0;
var gamestate=play;


function preload(){
  backgroundimage=loadImage("images/skybackground.jpg")
  planeimage=loadImage("images/planeimage.png")
  stephanyimage=loadImage("images/stephanyimage.png")
  parachuteimage=loadImage("images/parachutereal.png")
  birdsimage=loadImage("images/birds-removebg-preview.png")
  gameoverimage=loadImage("images/game over.png")
  restartimage=loadImage("images/restart.png")

  
}


function setup() {
  createCanvas(1250,700);
  background1=createSprite(700, 500, 1000, 1000);
  background1.addImage(backgroundimage)
  background1.scale=3
  background1.velocityY=-30
  background1.y=background1.width/2
  plane = createSprite(500,100,40,16)
  plane.addImage(planeimage)
  plane.velocityY=-10
  plane.lifetime=10
  stephany = createSprite(500,140,10,10)
  stephany.addImage(stephanyimage)
  stephany.scale = 0.4
  gameover=createSprite(625,350)
    gameover.addImage(gameoverimage)
    restart=createSprite(1200,100)
    restart.addImage(restartimage)
    restart.scale= 0.2
  score=0
  parachutegroup=createGroup()
  birdsGroup=createGroup()
}


function draw() {
  background(255,255,255);
  if(gamestate===play){
    gameover.visible=false;
    restart.visible=false;
  background1.velocityY=-30
  if(background1.y<0){
    background1.y=background1.width/2

  }
  if(keyDown("RIGHT_ARROW")&&stephany.x<1150){
    stephany.x+=6
  }
  if(keyDown("LEFT_ARROW")&&stephany.x>100){
    stephany.x+=-6
  }
  if(keyDown("DOWN_ARROW")&&stephany.y<500){
    stephany.y+=6
  }
  if(keyDown("UP_ARROW")&&stephany.y>100){
    stephany.y+=-6
  }
  spawnparachute()
  spawnbirds()
  if(parachutegroup.isTouching(stephany)){
    parachutegroup.destroyEach()
    score+=1
  }
  if(birdsGroup.isTouching(stephany)){
    gamestate=end;
  }
}
else if(gamestate===end){
  gameover.visible=true
  restart.visible=true
    stephany.velocityY=20
    background1.velocityY=0
    //parachutegroup.setVelocityYEach(0)
    //birdsGroup.setVelocityXEach(0)
    
  if(mousePressedOver(restart)){
    reset()
  }
}
     drawSprites();
     textSize(30)
     text(score+"   collected",1000,200)
}


function spawnparachute(){
if(frameCount % 100===0){
  parachute = createSprite(Math.round(random(100,1200)),50,30,30)
  parachute.velocityY=7
  parachute.addImage(parachuteimage)
  parachute.scale=0.2
  parachute.lifetime = 700
  parachutegroup.add(parachute)
}
}
function spawnbirds(){
  if(frameCount % 90===0){
    birds=createSprite(50,Math.round(random(50,650)),30,30)
    birds.addImage(birdsimage)
    birds.scale=0.2
    birds.velocityX=7
    birdsGroup.add(birds)
  }
}

function reset(){
gamestate=play
gameover.visible=false;
restart.visible=false;

}