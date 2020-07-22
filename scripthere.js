var currentSymbol = 0;
var winner = 0;
var filledBox = [0,0,0,0,0,0,0,0,0];
var turn = 0;
var findUnfilledBox = 0;

function colNumber(loc){
    var row = Math.floor(loc / 3);
    var col = loc % 3
    y = row * 100 + 50
    x = col * 100 + 50    
    return [x,y];
}

function drawBox(){
    var myCanvas=document.getElementById("thisIsCanvas");
    myCanvas.height=window.innerHeight;
    myCanvas.width=window.innerWidth;
    var ctx=myCanvas.getContext("2d");
    //ctx.fillRect(0,0,900,900);
    var i;
    for (i=1;i<3;i++){
        ctx.beginPath();
        ctx.moveTo(0, i*100);
        ctx.lineTo(300, i*100);
        ctx.stroke();
    }
    for (i=1;i<3;i++){
        ctx.beginPath();
        ctx.moveTo(i*100, 0);
        ctx.lineTo(i*100,300);
        ctx.stroke();
    }
}

function drawX(getArray){
    var midX = getArray[0];
    var midY = getArray[1]
    var myCanvas=document.getElementById("thisIsCanvas");
    var ctx=myCanvas.getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(midX-40, midY-40);
    ctx.lineTo(midX+40, midY+40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(midX+40, midY-40);
    ctx.lineTo(midX-40, midY+40);
    ctx.stroke();
}

function drawO(getArray){
    var midX = getArray[0];
    var midY = getArray[1];
    var myCanvas=document.getElementById("thisIsCanvas");
    var ctx=myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(midX,midY,40,0,2*Math.PI);
    ctx.stroke();
}

function getRow(num){
    if (num <=100){
        return 0
    }
    else if (num <= 200){
        return 1
    }
    else{
        return 2
    }
}


function checkWinner1(){
    if (filledBox[0] == 1 & filledBox[1] == 1 & filledBox[2] == 1){
        winner = 1;
    }
    else if (filledBox[3] == 1 & filledBox[4] == 1 & filledBox[5] == 1){
        winner = 1;
    }
    else if (filledBox[6] == 1 & filledBox[7] == 1 & filledBox[8] == 1){
        winner = 1;
    } 
    else if (filledBox[0] == 1 & filledBox[3] == 1 & filledBox[6] == 1){
        winner = 1;
    }
    else if (filledBox[1] == 1 & filledBox[4] == 1 & filledBox[7] == 1){
        winner = 1;
    }
    else if (filledBox[2] == 1 & filledBox[5] == 1 & filledBox[8] == 1){
        winner = 1;
    }
    else if (filledBox[0] == 1 & filledBox[4] == 1 & filledBox[8] == 1){
        winner = 1;
    }
    else if (filledBox[2] == 1 & filledBox[4] == 1 & filledBox[6] == 1){
        winner = 1;
    }
}

function checkWinner2(){
    if (filledBox[0] == 2 & filledBox[1] == 2 & filledBox[2] == 2){
        winner = 2;
    }
    else if (filledBox[3] == 2 & filledBox[4] == 2 & filledBox[5] == 2){
        winner = 2;
    }
    else if (filledBox[6] == 2 & filledBox[7] == 2 & filledBox[8] == 2){
        winner = 2;
    } 
    else if (filledBox[0] == 2 & filledBox[3] == 2 & filledBox[6] == 2){
        winner = 2;
    }
    else if (filledBox[1] == 2 & filledBox[4] == 2 & filledBox[7] == 2){
        winner = 2;
    }
    else if (filledBox[2] == 2 & filledBox[5] == 2 & filledBox[8] == 2){
        winner = 2;
    }
    else if (filledBox[0] == 2 & filledBox[4] == 2 & filledBox[8] == 2){
        winner = 2;
    }
    else if (filledBox[2] == 2 & filledBox[4] == 2 & filledBox[6] == 2){
        winner = 2;
    }
}

function getCol(num){
    if (num <=100){
        return 0
    }
    else if (num <= 200){
        return 1
    }
    else{
        return 2
    }
}

function printMousePos(event) {
    var y = getCol(event.clientX);
    var x = getRow(event.clientY);
    targetBox = x*3 + y;

    console.log("findunfilledbox " + findUnfilledBox);
    console.log("turn " + turn);

    if(turn % 2 == 0 & filledBox[targetBox] == 0){
        filledBox[targetBox] = 2;
        turn += 1;
        findUnfilledBox = 0;
    }
}

function botTurn(){
    var randomNumber;
    while(findUnfilledBox == 0){
        randomNumber = Math.floor(Math.random()*10000) % 9;
        console.log(randomNumber);
        if (filledBox[randomNumber]== 0){
            filledBox[randomNumber] = 1;
            findUnfilledBox = 1;
            turn += 1;
        }
    }
}

window.addEventListener("click", printMousePos);

function drawGame(){

    if (winner == 1 | winner == 2){
        //document.body.textContent = "Winner is " + winner;
        console.log("Winner is " + winner)
    }

    else{
        drawBox();
        for(i=0;i<9;i++){
            if (filledBox[i]== 1){
                var toFill = colNumber(i);
                drawX(toFill);
            }
            else if (filledBox[i] == 2){
                var toFill = colNumber(i);
                drawO(toFill);
            }
        }
        checkWinner1();
        checkWinner2();
    }
    
    if (turn % 2 ==1){
        botTurn();
    }
}

window.onload=function(){
    setInterval(drawGame,60);
    //    below command for output text    
    //    console.log(Math.floor(Math.random()*10000) % 9);
}