//Create variables here
var dog, happyDog, database, foodStock;
var foodS = 0
var addfood
function preload(){
  //load images here
  HappydogIMG = loadImage("images/dogImg1.png")
  dogIMG = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  dog = createSprite(800,250,10,10);
  dog.addImage(dogIMG)
  dog.scale = 0.2

  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  foodObj = new Food;
  feed = createButton("Feed the dog!")
  feed.position(1000,400)
  addfood = createButton("Add Food!")
  addfood.position(1200,400)
  feed.mousePressed(FeedDog)
  addfood.mousePressed(addfoods)
}


function draw() {  
background(46, 139, 87);
foodObj.display();
if(keyIsDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(HappydogIMG)
}else{
  dog.addImage(dogIMG)
}
  drawSprites();
  //add styles here
  fill("black")
  scale(1.1)
  text("Food Remaining: " + foodS, 680,150);

}
function FeedDog(){
if(foodObj.getFoodStock()<1){
foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}
else{
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}
database.ref("/").update({
  food:foodObj.getFoodStock()
})
}
function addfoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock(x){
  if(x<=0){
    x = 0
  }else{
    x = x-1
  }
database.ref("/").update({food:x})
}

