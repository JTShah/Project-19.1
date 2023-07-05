//variables
var run, run_img, jump, jump_img;
var dragon, dragon_img;
var bg, bg_img;
var floor,floor_img;
var tree, tree1, tree2, boulder, boulder_img, boulder_grp, tree_grp;
var potion, potion_img, potion_grp;
var gameover, gameover_img;
var dragonEnd_img, runEnd_img;


PLAY=1;
END=0;

var gamestate=PLAY;

var health=100;
var time=0;



// The Great 3 Functions
function preload(){
    run_img=loadAnimation("Run1.png","Run2.png","Run3.png","Run4.png","Run5.png","Run6.png");
    jump_img=loadAnimation("Jump1.png","Jump2.png","Jump3.png","Jump4.png","Jump5.png","Jump6.png","Jump7.png","Jump8.png");
    bg_img=loadImage("background.png");
    floor_img=loadImage("floor.png");
    dragon_img=loadAnimation("Dragon1.png","Dragon2.png","Dragon3.png","Dragon4.png","Dragon5.png","Dragon6.png","Dragon7.png","Dragon8.png")
    tree1=loadImage("tree.png");
    tree2=loadImage("tree2.png");
    boulder_img=loadImage("boulder.png");
    potion_img=loadImage("potion.png");
    gameover_img=loadImage("over.png");
    dragonEnd_img=loadImage("Dragon7.png");
    runEnd_img=loadImage("dead.png");

}
function setup() {
    createCanvas(1024,405);
    bg=createSprite(512,202.5);
    bg.addImage("bg",bg_img);
    

    //creating Samir
    run=createSprite(512,330,20,20);
    run.addAnimation("run",run_img);
    run.addAnimation("jump",jump_img);
    run.addAnimation("runEnd", runEnd_img);

    //creating Dragon
    dragon=createSprite(200,325,20,20);
    dragon.addAnimation("dragon",dragon_img);
    dragon.addAnimation("End",dragonEnd_img);

    floor=createSprite(512,375,1024,10);
    floor.depth=run.depth-1
    floor.scale=0.6;
    floor.visible= false;

    gameover=createSprite(512,202.5,60,30);
    gameover.addImage("Gameover", gameover_img);
    gameover.visible=false;
    
    //groups
    tree_grp= new Group();
    potion_grp=new Group();
    boulder_grp=new Group();
    

}

function draw() {
  
  
    background("#4a4a6d");
    text("Health: "+ health,950,30);
    text("Time: " +time+Math.round(frameCount/60),950,50);

    run.setCollider("circle",0,0,20);
    run.debug=true;


    //adding gamestates
    if(gamestate===PLAY) {
        gameover.visible=false;
        bg.velocityX= -(5+3*time/100);
        if(bg.x<0) {
            bg.x=bg.width/2;
        }

        if((keyDown("space") || touches.length>0) && run.y>height-100) {
            run.velocityY=-13;
            touches=[];
            run.changeAnimation( "jump" ,jump_img);
          }
         //applying gravity
        run.velocityY=run.velocityY+0.5;


        spawnTrees();
        spawnBoulders();
        spawnPotions();
        
        if(run.isTouching(boulder_grp)) {
            health=health-10;
        }

        if(run.isTouching(potion_grp)) {
            health=health+5;
        }

        if(health===0) {
            gamestate= END;
        }

    }

    else if(gamestate === END) {
        floor.velocityX=0;
        potion_grp.destroyEach();
        boulder_grp.destroyEach();
        tree_grp.destroyEach();
        run.changeAnimation("runEnd", runEnd_img);
        dragon.changeAnimation("End", dragonEnd_img);
        gameover.visible=true;

        if(mousePressedOver(gameover)) {
            gamestate=PLAY;
        }

    }

    
    run.collide(floor);
    drawSprites();
}

//lesser functions

function spawnTrees() {
    if(frameCount%150===0) {
      tree=createSprite(width+20,340,10,40);
      tree.velocityX= bg.velocityX;
      tree.scale=0.6;
      var num1=Math.round(random(1,2));
      console.log(num1);
  
      switch(num1) {
  
        case 1:
          tree.addImage(tree1);
          break;
  
        case 2:
          tree.addImage(tree2);
          break;
      }

      tree_grp.add(tree);
    }

}

function spawnBoulders() {
    if(frameCount%60===0) {
        boulder=createSprite(width+20,350,10,40);
        boulder.addImage("boulder", boulder_img);
        boulder.velocityX= bg.velocityX;
        boulder.scale=0.4;
        
    
        boulder_grp.add(boulder);
    }
}

function spawnPotions() {
    if(frameCount%200===0) {
        potion=createSprite(width+20,340,10,40);
        potion.addImage("potion", potion_img);
        potion.velocityX= bg.velocityX;
        potion.scale=0.2;
        
    
        potion_grp.add(potion);
    }
}

function reset() {

}


          


