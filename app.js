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
        body: [[1,2],[1,2],[1,4]],
        nextDirection: [0, 1]
    }
};

function tick () {
    let newSegment = []
    newSegment.push(gameState.snake.body[gameState.snake.body.length-1][0]+ gameState.snake.nextDirection[0])
    newSegment.push(gameState.snake.body[gameState.snake.body.length-1][1]+ gameState.snake.nextDirection[1])
    gameState.snake.body.push(newSegment)
    gameState.snake.body.shift()
    console.log(gameState.snake.body)
}

boardButton.addEventListener('click', genTable)
playButton.addEventListener('click', tick)


//gameState.snake.body.pop()
//gameState.snake.body.unshift()
