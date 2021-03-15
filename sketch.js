var tower,ghost,door,invisibleBlock;
var towerImage,ghostImage,doorImage,climberImage;
var doorGroup,climberGroup,invisibleBlockGroup,spookySound;

var gameState = "play";


function preload(){
  
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png")
  
  spookySound = loadSound("spooky.wav");
  

}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImage);
  ghost.scale = 0.5;

  
 doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  spookySound.loop();
}

function draw(){
  
  background(0)
  
  if(gameState==="play"){
  if(tower.y>500){
    
    tower.y = 300;       
     
  }
  spawnDoors();
//ghost.velocityY = 15;
  
  if(keyDown("space")){
    ghost.velocityY = -3;
  }
  ghost.velocityY = ghost.velocityY+1;
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
     }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
     }
if(climberGroup.isTouching(ghost)){
  
  ghost.velocityY = 0;
  
} 
if(invisibleBlockGroup.isTouching(ghost)  || ghost.y>600){
      
      ghost.destroy();
      gameState = "end";
      
    }
  drawSprites();
  }
  if(gameState==="end"){
    textSize(50);
    fill("red");
    text("Game Over",190,300);
    
  }

}

function spawnDoors(){
  if(frameCount%300===0){
     door = createSprite(200,-50);
  door.addImage(doorImage);
  door.velocityY = 1;
    door.x = Math.round(random(150,400));
    door.lifetime = 600;
    doorGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 600;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlock.debug = true;
    
    
    invisibleBlockGroup.add(invisibleBlock);
    
    climberGroup.add(climber);
  }
}


