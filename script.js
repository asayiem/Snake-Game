let blockSize = 25;
let total_row = 17; //total number of rows
let total_col = 17; //total number of columns
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//set the total number of rows and columns
let speedX = 0; //speed of the snake in x
let speedY = 0; //speed of the snake in y

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function(){
    //Set board height and weight
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection); //movement
    //set snake speed
    setInterval(update, 1000/10);
}

function update(){
    if(gameOver){
        return;
    }
    //background of the game
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height);
    
    //set food color and position
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    //make body of the snake grow
    for(let i = snakeBody.length - 1; i > 0; i--){
        //storing the previous part of the snake to the current one
        snakeBody[i] = snakeBody[i - 1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "green";
    snakeX += speedX * blockSize; //updating snake in x
    snakeY += speedY * blockSize; //updating snake in y

    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    if(snakeX < 0
        || snakeX > total_col * blockSize ||
        snakeY < 0 || snakeY > total_row * blockSize
        ){
            //out of bounds
            gameOver = true;
            alert("Game Over");
        }
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            //snake eats itself
            gameOver = true;
            alert("Game Over");
        }
    }   
}
//movement of the snake
function changeDirection(e){
    if(e.code == "ArrowUp" && speedY != 1){
        //if up arrow is pressed
        //snake will not move in the oppsite direction
        speedX = 0;
        speedY = -1;
    }else if(e.code == "ArrowDown" && speedY != -1){
        //if down arrow is pressed
        speedX = 0;
        speedY = 1
    }else if(e.code == "ArrowLeft" && speedX != 1){
        //if left arrow is pressed
        speedX = -1;
        speedY = 0;
    }else if(e.code == "ArrowRight"&& speedX != -1){
        //if right arrow is pressed
        speedX = 1;
        speedY = 0;
    }
}

//randomly place food
function placeFood(){
    //x coords
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    //y coords
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}