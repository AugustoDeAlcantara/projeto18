//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

var knife, spawner1, spawner2, spawner3, fruit, monster, InvisibleWallGroup,fruitGroup,monsterGroup, score, r, randomFruit, position;
var knifeImage, scene, fruit1, fruit2 ,fruit3,fruit4, fruit5, monsterImage, gameOverImage;
var gameOverSound,backgroundSound, sliceSound1, sliceSound2, sliceSound3, sliceSound4, sliceSound5, sliceSound6
var scene, InvisibleWall1, InvisibleWall2, InvisibleWall3, InvisibleWall4


function preload(){
  
  knifeImage = loadImage("KnifeF.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  fruit5 = loadImage('fruit5.png');

  gameOverSound= loadSound('gameOverSound.mp3');
  gameOverImage = loadImage("gameover.png");
  sceneImg=loadImage('fuitNinjaBackground.jpg')
  backgroundSound= loadSound('backgroundMusic.mp3');

  sliceSound1= loadSound('sliceSound1.mp3');
  sliceSound2= loadSound('sliceSound2.mp3');
  sliceSound3= loadSound('sliceSound3.mp3');
  sliceSound4= loadSound('sliceSound4.mp3');
  sliceSound5= loadSound('sliceSound5.mp3');
  sliceSound6= loadSound('sliceSound6.mp3');
}



function setup() {
  createCanvas(1385, 760);
  scene = createSprite(692.5,380,400,400);
  scene.addImage(sceneImg);
  scene.scale = 0.78

  InvisibleWall1=createSprite(10, 750, 10, 200);
  InvisibleWall1.visible=false

  InvisibleWall2=createSprite(350, 750, 10, 200);
  InvisibleWall2.visible=false;

  InvisibleWall3=createSprite(1000, 750, 10, 200);
  InvisibleWall3.visible=false;

  InvisibleWall4=createSprite(1385, 750, 10, 200);
  InvisibleWall4.visible=false;

//criar espada
knife=createSprite(40,200,20,20);
knife.addImage(knifeImage);
knife.scale=0.2
  
//definir colisor para espada
knife.setCollider("rectangle",0,0,40,40);
// Variáveis de pontuação e grupos
score=0;
fruitGroup=createGroup();
monsterGroup=createGroup();
  
}

function draw() {
background("lightblue");
if(gameState===PLAY){

fruits();
Monster();  
    
// Mova a espada com o mouse
knife.y=World.mouseY;
knife.x=World.mouseX;
  
// Aumenta a pontuação se a espada tocar na fruta
if(fruitGroup.isTouching(knife)){
sliceSound1.play();
fruitGroup.destroyEach();
score=score+150;
}
else
{
// Vá para o estado final se a espada tocar o inimigo
if(monsterGroup.isTouching(knife)){
gameState=END;
gameOverSound.play();

fruitGroup.destroyEach();
monsterGroup.destroyEach();
fruitGroup.setVelocityXEach(0);
monsterGroup.setVelocityXEach(0);
spawner1.destroy();
spawner2.destroy();
spawner3.destroy();
        
knife.addImage(gameOverImage);
knife.scale=2;
knife.x=692.5;
knife.y=380;
}
}
}
//spawner1.bounceOff(InvisibleWall1);
//spawner1.bounceOff(InvisibleWall2);
//spawner2.bounceOff(InvisibleWall3);
//spawner2.bounceOff(InvisibleWall4);
//spawner3.bounceOff(InvisibleWall2);
//spawner3.bounceOff(InvisibleWall3);


drawSprites();
//Pontuação
textSize(25);
text("Score: " +score, 590,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(1385,200,20,20);
    monster.y=Math.round(random(100, 550));
    monster.addAnimation("moving", monsterImage);
    monster.velocityX = -8;
    monster.lifetime=200;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
spawner1=createSprite(20, 750, 10, 10); 
spawner1.visible=false;
spawner2=createSprite(1360, 750, 10, 10);
spawner2.visible=false;
spawner3=createSprite(700, 750, 10, 10);
spawner3.visible=false;

spawner1.velocityX=+3
spawner2.velocityX=-3
spawner3.velocityX=3


if(frameCount%80===0){
position=Math.round(random(3));
fruit=createSprite(20,700,20,20);


if(position===1){
fruit.x=spawner1.x
fruit.y=spawner1.y
fruit.velocityY=-7
fruit.velocityX=5
}

if(position===2){
fruit.x=spawner2.x
fruit.y=spawner2.y
fruit.velocityY=-7
fruit.velocityX=-5
}

if (position===3){
fruit.x=spawner3.x
fruit.y=750;
fruit.velocityY=-7
fruit.velocityX=-5
}

      
fruit.scale=0.2;
//fruit.debug=true;
//Imagem das frutas
r=Math.round(random(1,5));
if (r == 1) {
fruit.addImage(fruit1);
} else if (r == 2) {
fruit.addImage(fruit2);
} else if (r == 3) {
fruit.addImage(fruit3);
} else if(r== 4){
fruit.addImage(fruit4);
} else if (r== 5){
fruit.addImage(fruit5);}

    
//fruit.y=Math.round(random(50,550));
   
    
fruit.lifetime=100;
    
fruitGroup.add(fruit);
}
}