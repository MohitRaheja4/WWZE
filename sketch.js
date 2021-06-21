var gameState = 1;
var player,playerImg;
var bgimg0,bgImg1,bgImg2,bgimg3,bgimg4,bgimg5;
var start,startImg;
var coinsScore,zombieScore,fontvar,fontvar2,underline,underlineGreen;
var coin,coingroup,coinimg;
var invisibleGround,edges,playerCollider;
var zombieimg,zombiegroup,zombie,zombieCollider;
var zomappear,zomattack,zomwalk,zomdie;
var bullet,bulletimg,shoot;

function preload()
{
  playerImg=loadImage("images/player.png");
  bgImg=loadImage("images/city.png");
  startImg=loadImage("images/start.png");
  fontvar=loadFont("images/font1.otf");
  fontvar2=loadFont("images/font2.ttf");
  bgImg2=loadImage("images/desert.png");
  bgimg3=loadImage("images/mountain.png");
  bgImg4=loadImage("images/forest.png");
  bgImg5=loadImage("images/island.png");
  bgimg0=loadImage("images/background.jpg");
  coinimg=loadAnimation("images/coin-0.png","images/coin-1.png","images/coin-2.png","images/coin-3.png",
  "images/coin-4.png","images/coin-5.png","images/coin-6.png","images/coin-7.png");
  zombieimg=loadAnimation("images/zombie-0.png","images/zombie-1.png","images/zombie-2.png",
  "images/zombie-3.png","images/zombie-4.png","images/zombie-6.png","images/zombie-7.png"
  ,"images/zombie-8.png","images/zombie-9.png","images/zombie-10.png","images/zombie-11.png","images/zombie-12.png"
  ,"images/zombie-13.png","images/zombie-14.png","images/zombie-15.png","images/zombie-16.png","images/zombie-17.png"
  ,"images/zombie-18.png");
  zomappear=loadAnimation("images/Archive/appear/appear_1.png","images/Archive/appear/appear_2.png",
  "images/Archive/appear/appear_3.png","images/Archive/appear/appear_4.png",
  "images/Archive/appear/appear_5.png","images/Archive/appear/appear_6.png",
  "images/Archive/appear/appear_7.png","images/Archive/appear/appear_8.png",
  "images/Archive/appear/appear_9.png","images/Archive/appear/appear_10.png",
  "images/Archive/appear/appear_11.png");
  zomwalk=loadAnimation("images/Archive/walk/go_1.png","images/Archive/walk/go_2.png",
  "images/Archive/walk/go_3.png","images/Archive/walk/go_4.png",
  "images/Archive/walk/go_5.png","images/Archive/walk/go_6.png",
  "images/Archive/walk/go_7.png","images/Archive/walk/go_7.png",
  "images/Archive/walk/go_9.png","images/Archive/walk/go_10.png");
  bulletimg=loadImage("images/bullet.png"); 
}

function setup()
{
  createCanvas(800,600);

  player = createSprite(90,480,60,60);
  player.addImage(playerImg);
  player.scale=0.4;

underlineGreen=createSprite(385,132,683,10);
  underlineGreen.shapeColor=rgb(119,186,69);
  underline=createSprite(385,132,677,5);
  underline.shapeColor=rgb(237,62,18);
  
  start = createButton("START");
  start.position(300,350);
  start.style('background-color',rgb(237,62,18))
  start.style('font-size','50px')
  start.style('font-family', 'Architects Daughter');
  start.style('border-width','17px');
  start.style('border-color',rgb(119,186,69));
  start.style('border-style','outset');
  start.style('border-radius','40px');

  shoot = createButton("SHOOT");
  coingroup= new Group();
  zombiegroup= new Group();

  invisibleGround=createSprite(400,602,800,1);
  playerCollider=createSprite(55,player.y,50,180);

  zombieCollider=createSprite(790,420,10,8);

  zombieScore=0;

  coinsScore=0;

  
}

function draw()
{
  background(0);
  edges=createEdgeSprites();
  player.collide(edges);

  spawnCoins();
  invisibleGround.visible=false;
//player.debug=true
  spawnzombies();

  player.collide(invisibleGround);

  playerCollider.velocityY=player.velocityY;
  playerCollider.y=player.y;
  playerCollider.visible=false;

  zombieCollider.visible=false;

  if(gameState===0)
  {
    background(bgimg0);
    start.show();
    player.visible=false;

    //displaying the game name
    strokeWeight(5);
    stroke(119,186,69);
    textSize(35);
    textFont(fontvar2);
    fill(237,62,18);
    text("WORLD WAR-ZOMBIE EDITION",55,110);

    //displaying instructions
    strokeWeight(3);
    stroke(119,186,69)
    textSize(20);
    text('1.PRESS SPACE TO JUMP AND COLLECT COINS.',110,200);
    text('2.CLICK ON THE ZOMBIES TO KILL THEM.',110,250);

   // coin.visible=false;
    
    start.mousePressed(()=>{
      gameState=1;
    })
  }

  if(gameState===1)
  {
    background(bgImg);
    
    start.hide();
    underlineGreen.visible=false;
    underline.visible=false;
    player.visible=true;
    textFont(fontvar2);
    textSize(15);
    fill(0);
    text("COINS: "+coinsScore,10,30);
    text("ZOMBIES KILLED: "+zombieScore,615,30) ;
    
    shoot.mousePressed(()=>{
      bullet=createSprite(180,450,90,10);
      bullet.addImage(bulletimg);
      bullet.scale=0.08;
      bullet.velocityX=8;
      
    })

    if(coinsScore>=5&&zombieScore>=10)
    {
      gameState=2;
    }

    if(keyDown("space") && player.y>=470)
    {
      player.velocityY=-15;
    }
    player.velocityY=player.velocityY+0.8;

    if(coingroup.isTouching(playerCollider))
    {
      coingroup.destroyEach();
      coinsScore++;
    }
     
  
   // mousePressed()
  // zombiegroup.mousePressed(()=>{ bullet})
  // zombiegroup.mousePressed(zombieScore++);
     }

  if(gameState===2)
  {
    score=0;
    background(bgImg2);
    start.hide();
    underlineGreen.visible=false;
    underline.visible=false;
    player.visible=true;
    textFont(fontvar2);
    textSize(15);
    fill(0);
    text("COINS: "+coinsScore,10,30);
    text("ZOMBIES KILLED: "+zombieScore,615,30);

    if(coinsScore>=6&&zombieScore>=12)
    {
      gameState=3
    }
  }

  if(gameState===3)
  {
    score=0;
    background(bgImg3);
    start.hide();
    underlineGreen.visible=false;
    underline.visible=false;
    player.visible=true;
    textFont(fontvar2);
    textSize(15);
    fill(0);
    text("COINS: "+coinsScore,10,30);
    text("ZOMBIES KILLED: "+zombieScore,615,30);

    if(coinsScore>=7&&zombieScore>=14)
    {
      gameState=4
    }
  }

  if(gameState===4)
  {
    score=0;
    background(bgImg4);
    start.hide();
    underlineGreen.visible=false;
    underline.visible=false;
    player.visible=true;
    textFont(fontvar2);
    textSize(15);
    fill(0);
    text("COINS: "+coinsScore,10,30);
    text("ZOMBIES KILLED: "+zombieScore,615,30);

    if(coinsScore>=8&&zombieScore>=16)
    {
      gameState=5;
    }
  }

  if(gameState===5)
  {
    score=0;
    background(bgImg5);
    start.hide();
    underlineGreen.visible=false;
    underline.visible=false;
    player.visible=true;
    textFont(fontvar2);
    textSize(15);
    fill(0);
    text("COINS: "+coinsScore,10,30);
    text("ZOMBIES KILLED: "+zombieScore,615,30);

   // if(coinsScore>=10&&zombieScore>=20)
  }
  drawSprites();
}

function spawnCoins()
{
  if (frameCount % 190 ===0)
  {
    coin=createSprite(805,Math.round(random(300,360)),200,200);
    coin.scale=0.3;
    coin.addAnimation("coinImage",coinimg);
    coin.velocityX=-4;
    coin.lifetime=300;
    coingroup.add(coin);
    coin.depth=player.depth;
    player.depth+=1;
  }
}

function spawnzombies()
{
  var frame= Math.round(random(50,70))
  if (frameCount % 80 ===0 )
  {
    zombie=createSprite(780,620,50,50);
    zombie.scale=0.5549;
    zombie.addAnimation("coinImage",zombieimg);
    zombie.velocityY=random(-3,-7);
    zombie.lifetime=300;
    
   
    zombie.depth=player.depth;
    //zombie.depth+=1;
     zombiegroup.add(zombie);
  }
  if(zombiegroup.isTouching(zombieCollider))
  {
   // zombie.changeAnimation("walking",zomwalk);
    zombie.velocityY=0;
    zombie.velocityX=random(-3,-7);
  }
}




