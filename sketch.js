var gameState="PLAY"
var boy,boyImage,boyImage2;
var ground
var bactiGroup,bacti,bactiImage;
var restart,restartImage,gameover,gameoverImage
var score=0
function preload(){
  boyImage=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy7.png","boy8.png","boy9.png",)
  bactiImage=loadImage("bacti.png");
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  boyImage2=loadAnimation("boy1.png");
}
function setup(){
  createCanvas(windowWidth-50,windowHeight-20);
boy=createSprite(50,windowHeight-60,20,50);
boy.addAnimation("boy123",boyImage)
boy.addAnimation("boyrunning",boyImage2)
boy.scale=0.5
ground=createSprite(200,550,2500,20);
ground.x = ground.width /2;
gameover=createSprite(windowWidth/2,windowHeight/2,100,10);
gameover.addImage(gameoverImage);
gameover.scale=0.5
gameover.visible=false;
restart=createSprite(windowWidth/2,windowHeight/2+40)
restart.addImage(restartImage);
restart.scale=0.5
restart.visible=false;
bactiGroup = new Group();
}
function draw(){
background("white")
if(gameState==="PLAY"){
if(keyDown("space") && boy.y >= windowHeight-80) {
  boy.velocityY = -12;
  
}
score=score+1
if(boy.isTouching(bactiGroup)){
  gameState="END"
 
}
boy.velocityY = boy.velocityY + 0.8
spawnBacti();
}
if(gameState==="END"){
  boy.velocityY=0;
  bacti.velocityX=0;
  gameover.visible=true;
  restart.visible=true;
  boy.changeAnimation("boyrunning",boyImage2)
  if(mousePressedOver(restart)){
    reset();
  }
}
boy.collide(ground);
drawSprites();
text("score:"+score,displayWidth/2+400,50);
}
function spawnBacti(){
  if(frameCount % 150 === 0) {
    bacti=createSprite(windowWidth/2,windowHeight-60,10,40)
    bacti.velocityX=-10
    bacti.addImage(bactiImage)
    bacti.scale=0.2
    bactiGroup.add(bacti);
  }
}
function reset(){
  gameover.visible=false;
  restart.visible=false;
  gameState="PLAY"
  bactiGroup.destroyEach();
  boy.changeAnimation("boy123",boyImage)
}