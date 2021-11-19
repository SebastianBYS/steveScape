var play = 1;
var end = 2;
var gameState = play;

var nightskyImg;
var muerteImg;
var invisibleGround;
var obstaclesG, tree, rocona , rocona2;
var steve, steve_running;
var zombie,zombie_running;
var zombieCo2;
var score=0;
var restart
var unuSound;
var deathSound;
var expSound;
var restart;
var menuClic;

function preload(){
 nightskyImg = loadImage("fondin.png");
 steve_running = loadAnimation("stevee_1.png","stevee_11.png","stevee_111.png","stevee_2.png","stevee_222.png","stevee_22.png" ,"stevee_3.png","stevee_33.png","stevee_333.png");
 zombie_running = loadAnimation("zombiee_1.png","zombiee_11.png","zombiee_2.png","zombiee_22.png","zombiee_3.png","zombiee_33.png","zombiee_4.png","zombiee_44.png","zombiee_5.png","zombiee_55.png","zombiee_6.png","zombiee_66.png","zombiee_7.png","zombiee_77.png");
 tree = loadImage("arbolon_1.png");
 rocona = loadImage("rocona_1.png");
 rocona2 = loadImage("rocona_2.png");
 muerteImg = loadImage("GameOver._..jpg");
 unuSound = loadSound("unu.mp3");
 deathSound = loadSound("deathSound.mp3");
 expSound = loadSound("ExpSound.mp3");
 menuClic = loadSound("menuClic.mp3");

}

function setup() {
unuSound.loop();
 createCanvas(600,300);
 steve=createSprite(200,250,30,30);
 steve.addAnimation("enemysteve",steve_running);
 steve.scale=0.13;
  
 zombie=createSprite(40,250,50,50);
 zombie.addAnimation("zombiepro",zombie_running);

 zombieCo2=createSprite(40,250,30,30);
 zombieCo2.visible=false;
 
 nightsky=createSprite(400,130);
 nightsky.addImage(nightskyImg);
 nightsky.scale=0.5;
 
 steve.depth=nightsky.depth;
 steve.depth=steve.depth+1;

 zombie.depth=nightsky.depth;
 zombie.depth=zombie.depth+1;
 zombie.scale=0.10;
 zombieCo2.depth=nightsky.depth;
 zombieCo2.depth=zombieCo2.depth+1;
 invisibleGround=createSprite(10,290,1500,5)
 invisibleGround.visible=false;

 restart=createSprite(300,170,300,25);
 restart.visible=false;

 obstaclesG=createGroup();
}

function draw() {
 background(0);

if(gameState===play){
  nightsky.velocityX=-3
  frameRate(60);
  score = score + Math.round(getFrameRate()/60);
  textSize(30);
 fill("white");
 text("score:  " + score,50,50);
 if (nightsky.x<280){
  nightsky.x=400;
 }
  
  if(keyDown("space") && steve.y>250) {
    steve.velocityY=-9;
  } 
  if (keyWentDown("b")){
    steve.scale=0.08;
  }
  if (keyWentUp("b")){
    steve.scale=0.12;
  }
  
  if (zombie.isTouching(obstaclesG)){
    zombie.velocityY=-11.5;
  }
  zombie.setCollider("rectangle", 0, 0, 2000, 450);
  zombie.debug=false;
  zombieCo2.x=zombie.x;
  zombieCo2.y=zombie.y;
  zombieCo2.debug=false;
  steve.setCollider("rectangle", -20, -50, 280, 600);
  steve.debug=false;

  zombie.velocityY = zombie.velocityY+0.5;
  steve.velocityY = steve.velocityY+0.5;

  if (frameCount % 500===0){
    steve.x=steve.x+30;
    zombie.x=zombie.x+10;
    obstaclesG.destroyEach;
    expSound.play();
  }
  
  spawnObstacles();

  if (obstaclesG.collide(steve)){
   steve.x=steve.x-20;
   obstaclesG.destroyEach();
   deathSound.play();
  }
   
  if (zombieCo2.isTouching(steve)){
    obstaclesG.destroyEach();
    steve.x=700;
    deathSound.play();
    gameState=end;
  }

}
if(gameState===end){
  background(muerteImg);
  if(mousePressedOver(restart)){
    menuClic.play();
    gameState=play;
    steve.x=200;
    steve.y=250;
    zombie.x=40;
    zombie.y=250;
    score=0;
  }
}

  steve.collide(invisibleGround);
  zombie.collide(invisibleGround);
 drawSprites();
 textSize(20);
 fill("orange");
 stroke("black")
 text("SCORE:  " + score,10,40);
}
 
  function spawnObstacles(){
    if(frameCount % 110 === 0){

    var obstaculo=createSprite(630,270,10,10);
    obstaculo.debug=false;
    obstaculo.velocityX=-5;
    obstaculo.lifetime=100;
    obstaculo.depth=zombie.depth;
    zombie.depth=zombie.depth+1;

    var rand = Math.round(random(1,5));
    switch(rand){
      case 1: obstaculo.addImage(tree);
              obstaculo.scale=0.35;
              obstaculo.y=205;
              obstaculo.setCollider("rectangle", 0, -50, 300, 250);
              obstaculo.depth=steve.depth;
              steve.depth=steve.depth+1;
              obstaculo.velocityX=-13;
              
              break;
       case 2: obstaculo.addImage(rocona);
              obstaculo.scale=0.2;
              obstaculo.setCollider("circle", 0, 0, 50);
              obstaculo.velocityX=-15;
              break;
              
              break;
      case 3: obstaculo.addImage(rocona);
              obstaculo.scale=0.3;
              obstaculo.setCollider("circle", 0, 0, 50);
              obstaculo.velocityX=-12;
              break;
      case 4: obstaculo.addImage(rocona2);
              obstaculo.scale=0.10;
              obstaculo.y=260;
              obstaculo.setCollider("circle", 0, 0, 170);
              obstaculo.velocityX=-13;
              break;
       case 5: obstaculo.addImage(tree);
              obstaculo.scale=0.15;
              obstaculo.y=255;
              obstaculo.setCollider("rectangle", 0, 0, 300, 250);
              obstaculo.depth=steve.depth;
              steve.depth=steve.depth+1;
              obstaculo.velocityX=-12;
              
              
              break;
      default:break;
    }
  obstaclesG.add(obstaculo);
   }
  }
  
  