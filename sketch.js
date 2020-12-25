var PLAY = 1;
var END = 0 ;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup;
var score;
var ground;


function preload(){
  
  

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkey_collided = loadAnimation("sprite_0.png")
  
}



function setup() {
  monkey = createSprite(30,320,10,10);
  monkey.addAnimation('munkey_running', monkey_running );
  monkey.scale = 0.1; 
  
   ground = createSprite(200,365,600,10);
  ground.visible = true;
  

obstaclesGroup = createGroup();
  obstaclesGroup = new Group();
  
  
foodGroup = createGroup();
  foodGroup = new Group();
  
  score = 0;
}


function draw() {
background(255);
  
if(gameState === PLAY){
     monkey.velocityY = monkey.velocityY + 0.8;

  
  
      if(keyDown("space")&& monkey.y >= 325) {
        monkey.velocityY = -15;
         
    }
        if(keyDown("up")&& monkey.y >= 325) {
        monkey.velocityY = -15;
        
    }
  
  if(foodGroup.isTouching(monkey)){
 score = score + 2 ;
    foodGroup.destroyEach();
}
  
  textSize(15);
  fill(0);
  text("score: "+ score,320,40 );
  
   ground.velocityX = -6;
   ground.x = ground.width /2;
  

  
 monkey.collide(ground);
 
  survival_time();
  food();
    rocks();
if(obstaclesGroup.isTouching(monkey)){
 gameState = END;
}

}
  
  else if(gameState === END){
    ground.velocityX = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    
    monkey.collide(ground);
    monkey.velocityY = 0;
 
    textSize(30);
    fill(0);
    text("Game Over", 130, 200)
    
     textSize(15);
  fill(0);
  text("score: "+ score,320,40 ); 
    
    
    
  }
  
  drawSprites();
}

function rocks(){
 if (frameCount % 60 === 0){
var obstacle = createSprite(450,341.5, 20, 20);
   obstacle.velocityX = -6;
   
    //generate random obstacles
  
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group

     obstacle.addImage('obstacle', obstacleImage);
 obstaclesGroup.add(obstacle);
   monkey.depth = obstacle.depth;
   monkey.depth = monkey.depth + 1;
  
   
    obstaclesGroup.setColliderEach("circle",40, obstacle.width, obstacle.height);
 obstaclesGroup.debug = false;
 
   
 }
}
function food(){
  if (frameCount % 68=== 0){
var banana = createSprite(600,280.5, 20, 20);
    
    banana.y = Math.round(random(250,320));
    
   banana.velocityX = -6;
   
    //generate random obstacles
  
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime = 300;
   
   //add each obstacle to the group

     banana.addImage('banana', bananaImage);
 foodGroup.add(banana);
   monkey.depth = banana.depth;
   monkey.depth = monkey.depth + 1;
     
    foodGroup.setColliderEach("circle",40, banana.width, banana.height);
   foodGroup.debug = false;
}
}
function survival_time(){
  var survivalTime = 0;
  stroke("black");
  textSize(20);
  fill(0);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Suvival Time " + survivalTime, 100, 50);
}

