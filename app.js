let table = document.getElementById('table');
let boardButton = document.getElementById('boardButton');
let select = document.getElementById('select');
let playButton = document.getElementById('playButton');
let board = [];

function genBoard(){
    let row =[]
    for (let j = 0; j<select.value; j++){
        row.push(0)    
    }
    for (let i=0; i<select.value;i++){
        board.push(row)  
    }
    console.log(board)
    
}

function genTable (){
    select = document.getElementById('select');
    for (let i=0; i<select.value;i++){
        let row = document.createElement('tr')
        for (let j = 0; j<select.value; j++){
            let newTd = document.createElement('td');
            row.appendChild(newTd)
        }
        table.appendChild(row);
    }
    genBoard()
}


let gameState = {
    apple: [0, 0],
    snake: {
        body: [[1,1],[1,2],[1,3]],
        nextDirection: [0, 1]
    },
    state: false
};

function tick () {
    if (gameState.state === true){
        let newSegment = []
        newSegment.push(gameState.snake.body[gameState.snake.body.length-1][0]+ gameState.snake.nextDirection[0])
        newSegment.push(gameState.snake.body[gameState.snake.body.length-1][1]+ gameState.snake.nextDirection[1])
        console.log()
        gameState.snake.body.push(newSegment)
        //table[newSegment[0]][newSegment[1]].classList.toggle('snake-body')
        gameState.snake.body.shift()
        console.log(gameState.snake.body)
    }
}

boardButton.addEventListener('click', genTable)
document.addEventListener('keydown', function (event) {
    //left
    if (event.keyCode === 37){
        gameState.snake.nextDirection = [0,-1]
        console.log('left')
    } 
    //up
    else if (event.keyCode === 38){
        gameState.snake.nextDirection = [-1,0]
        console.log('up')
    } 
    //right
    else if (event.keyCode === 39){
        gameState.snake.nextDirection = [0,1]
        console.log('right')
    }
    //down
    else if (event.keyCode === 40){
        gameState.snake.nextDirection = [1,0]
        console.log("down")
    }
    

})


playButton.addEventListener('click', function(){
    gameState.state = true
} )

setInterval(tick, 1000)
