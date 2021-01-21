var dog,happyDog,Database,foodS,foodstock;
var dogIm,DogHappy,readStock;
var FeedButton, AddButton;
var foodObj, foodSt;
var fedTime,lastFed;


function preload(){
  dogIm = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");

}
function setup(){
  createCanvas(1200,500);
  dog = createSprite(1000,250,5,5);
  dog.addImage(dogIm);
  dog.scale=0.2;
  Database = firebase.database();
  foodstock=Database.ref('Food');
  foodstock.on("value",readStock);
  console.log("foodstock: " +foodstock);
  foodObj =new Food();



  FeedButton = createButton("Feed the dog");
  FeedButton.position(700,95);
  FeedButton.mousePressed(feedDog);

  AddButton = createButton("Add food");
  AddButton.position(800,95);
  AddButton.mousePressed(addFoods);

}
function draw(){  
  background(46,139,87);
 
  foodObj.display();

  fedTime=Database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill("white");
  textSize(15);
  if(lastFed>=12){
     text("LAST FED: " +lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0){
    text("LAST FED: 12 AM",350,30);
  }
  else
  {
    text("LAST FED: " +lastFed%12 + "AM",350,30);
  }
  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  Database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  Database.ref('/').update({
    Food:foodS
  })
}
