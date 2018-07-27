const ctx = document.getElementById('canvas').getContext('2d');
let aside = document.getElementById('score');

//variables
let WIDTH = '500';
let HIEGHT = '500';
ctx.font = "20px Calibri";
let snakeList, foodList, direction, eaten, intervalVar, score, gameRunning, level, stage, timer, timerCounter, countDown,foodEaten, foodStored, timerCounter2;
ctx.fillStyle = "#62d1ff";
ctx.fillText('Click to Start Snake Adventure.', 140, 250);
ctx.fillText('To play use the W,S,A,D keys.', 140, 280);
ctx.fillText('make sure caps lock is off', 140, 310);
// snake body

// objects
const snakeBody = {
    width:20,
    height:20,
    color: "#62d1ff",
    speedX: 5,
    speedY: 5,
};
// food
const food = {

    width:20,
    height:20,
    color:'#ff944c'
};

document.getElementById('canvas').onmousedown = () => {
    if (gameRunning) {
        clearInterval(intervalVar);
        gameRunning = false

    }


    startGame();


// timer

    timerCounter = setInterval(() => {
            timer - --countDown;

            if (countDown <= 0 && foodEaten < 5) {
                clearInterval(timerCounter);
                clearInterval(intervalVar);
                ctx.fillText('Game Over!!! Fatality click to restart', 100, 200);

            }
            else if (countDown === 0) {
                clearInterval(timerCounter);
                timer = 20;
                countDown = 20;
                setInterval(() => {
                    timer - --countDown;
                    if (countDown <= 0 && foodEaten < 15) {
                        clearInterval(timerCounter);
                        clearInterval(intervalVar);
                        ctx.fillText('Game Over!!! Fatality click to restart', 100, 200);
                    }

                    }, 1000)
            }
            else if (countDown === 0) {
                clearInterval(timerCounter);
                timer = 20;
                countDown = 20;
                setInterval(() => {
                    timer - --countDown;
                    if (countDown <= 0 && foodEaten < 25) {
                        clearInterval(timerCounter);
                        clearInterval(intervalVar);
                        ctx.fillText('Game Over!!! Fatality click to restart', 100, 200);
                    }

                }, 1000)
            }

            else if (countDown === 0) {
                clearInterval(timerCounter);
                timer = 20;
                countDown = 20;
                setInterval(() => {
                    timer - --countDown;
                    if (countDown <= 0 && foodEaten < 35) {
                        clearInterval(timerCounter);
                        clearInterval(intervalVar);
                        ctx.fillText('Game Over!!! Fatality click to restart', 100, 200);
                    }

                }, 1000)
            }








        }


        , 1000);

};







// user input mapping to snake

document.onkeydown = (event) => {
    // 0 = left
    // 1 = up
    // 2 = right
    // 3 = left
    if (event.key === 'a' && direction !== 2 ) {
        direction = 0;

    }


    else if (event.key === 'w' && direction !== 3 ) {
        direction = 1;

    }



    else if (event.key === 'd' && direction !== 0 ) {
        direction = 2;

    }


    else if (event.key === 's' && direction !== 1) {
        direction = 3;

    }





};

// test Collision

testCollision = (rect1,rect2) => {
    return( (rect1.x <= rect2.x + food.width) &&
        (rect2.x <= rect1.x + snakeBody.width) &&
        (rect1.y <= rect2.y + food.height) &&
        (rect2.y <= rect1.y + snakeBody.height)
    );
};
// test function for if games is over

testCollisionSnake = (snake1,snake2) => {
    return ((Math.abs(snake1.x-snake2.x) < 5) &&
        (Math.abs(snake1.y-snake2.y) < 5));
};
















drawSnake = (sb, index)  => {
    ctx.save();
    //color snake head
    if (index === 0) {
        ctx.fillStyle = '#78ff5f'
    }
    else {
        ctx.fillStyle = snakeBody.color;

    }
    ctx.fillRect(sb.x,sb.y,snakeBody.width,snakeBody.height);


    ctx.restore();


};

drawFood = (f,index) => {
    ctx.save();
    ctx.fillStyle = food.color;
    ctx.fillRect(f.x,f.y,food.width,food.height);
    ctx.restore();

};

updateSnakeList = () => {
    for (let i=snakeList.length-1;i >= 0; i--) {
        if (direction === 0) {
            if (i === 0) {

                snakeList[i].x = snakeList[i].x - snakeBody.speedX;
            }

            else {
                snakeList[i].x = snakeList[i - 1].x;
                snakeList[i].y = snakeList[i - 1].y;

            }
        }

        else if (direction === 1) {
            if (i === 0) {

                snakeList[i].y = snakeList[i].y - snakeBody.speedY;
            }

            else {
                snakeList[i].x = snakeList[i - 1].x;
                snakeList[i].y = snakeList[i - 1].y;

            }


        }


        else if (direction === 2) {
            if (i === 0) {

                snakeList[i].x = snakeList[i].x + snakeBody.speedX;
            }

            else {
                snakeList[i].x = snakeList[i - 1].x;
                snakeList[i].y = snakeList[i - 1].y;

            }


        }

        else if (direction === 3) {

            if (i === 0) {

                snakeList[i].y = snakeList[i].y + snakeBody.speedY;
            }

            else {
                snakeList[i].x = snakeList[i - 1].x;
                snakeList[i].y = snakeList[i - 1].y;

            }







        }

    }

};


checkSnakePosition =() => {
    if (snakeList[0].x > 500) {
        snakeList[0].x = 0;
    }

    if (snakeList[0].x < 0) {
        snakeList[0].x = 500;
    }

    if (snakeList[0].y > 500) {
        snakeList[0].y = 0;
    }

    if (snakeList[0].y < 0) {
        snakeList[0].y = 500;
    }


};

// levels

gameLevel = () => {
   stage.map((s) => {
       if (s === score) {
           level += 1
       }


   } );


};









// game over
isGameOver = () => {
    for ( let i in snakeList){
        if(i === 0)
            continue;
        if (testCollisionSnake(snakeList[0],snakeList[1])) {
            clearInterval(intervalVar);
            clearInterval(timerCounter);
            ctx.fillText('Game Over!!! Fatality click to restart', 140,250);
            return;

        }
        }

        while (timerCounter === true){
           clearInterval(intervalVar);
           clearInterval(timerCounter);
            ctx.fillText('Game Over!!! Fatality click to restart', 100,200);


        }







    // Game Won
        if (score === 2000){
            clearInterval(intervalVar);
            clearInterval(timerCounter);
            ctx.fillText('CONGRATULATIONS YOU WON!!!!', 100,200);
            document.getElementById('score').textContent = "  CONGRATULATIONS!!!!";
            let div = document.createElement('div');
            div.setAttribute("class",'container');
            let img = document.createElement('img');
            img.style.borderRadius = "10%";

            img.style.width = '300px';
            img.style.height = '300px';

            img.src = 'https://media0.giphy.com/media/1BfS2YxTSvFfTlSCfL/giphy.gif';
            div.appendChild(img);
            aside.appendChild(div);

            document.getElementById('level').textContent = "";
            document.getElementById('food').textContent = "";
            document.getElementById('timer').textContent = "";


        }











};










// update snake position
updateSnakePosition = () => {
    ctx.clearRect(0,0,WIDTH,HIEGHT);
    while(eaten) {
        let pos_x = Math.random()*485+7;
        let pos_y = Math.random()*485+7;
        foodList[0] = {x:pos_x,y:pos_y};
        eaten =false;

    }


    foodList.forEach(drawFood);
    snakeList.forEach(drawSnake);
    // Collision

    if(testCollision(snakeList[0],foodList[0])) {
        foodList = [];
        eaten = true;
        foodEaten++;
        // snake body speed updates
        snakeBody.speedX += 1;

        // score update when food gets eaten.
        score += 100;
        gameLevel();


        let newX, newY;
        if(direction === 0) {

            newX = snakeList[0].x - 10;
            newY = snakeList[0].y;

        }

        if(direction === 1) {

            newX = snakeList[0].x ;
            newY = snakeList[0].y - 10;

        }

        if(direction === 2) {

            newX = snakeList[0].x + 10;
            newY = snakeList[0].y;

        }

        if(direction === 3) {

            newX = snakeList[0].x ;
            newY = snakeList[0].y + 10;

        }
        snakeList.unshift({x:newX,y:newY});

    }
    // display score
    ctx.fillStyle = '#ffffff';
    ctx.fillText("SCORE : " + score, 380, 20);
    document.getElementById('score').textContent = "SCORE : " + score;
    ctx.fillText("LEVEL : " + level, 380, 40);
    document.getElementById('level').textContent = "LEVEL : " + level;
    ctx.fillText("TIMER : " + countDown, 10, 20);
    document.getElementById('timer').textContent = "TIMER : " + countDown;
    ctx.fillText("FOOD : " + foodEaten, 10, 40);
    document.getElementById('food').textContent = "FOOD : " + foodEaten;

    isGameOver();
    checkSnakePosition();
    updateSnakeList();

};

startGame = () => {
    // snake comprises of 3 parts
    snakeList = [
        // head
        {x:220,y:200},
        //body
        {x:210,y:200},
        //tail
        {x:200,y:200},

    ];

    foodList = [];
    //for each loop for the sank bodies.

    eaten = true;
    direction = 99;
    score = 0;
    level = 0;
    stage = [1000,2000,3000,4000, 5000, 6000, 7000, 8000, 9000,10000];
    timer = 25 ;
    countDown = 25;
    foodEaten = 0;
    gameRunning = true;
    intervalVar = setInterval(updateSnakePosition,40); // 50 fps;


};

