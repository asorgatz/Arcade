let table = document.getElementById('table');
let boardButton = document.getElementById('boardButton');
let select = document.getElementById('select');
let playButton = document.getElementById('playButton');

let gameState = {
    apple: [0, 0],
    snake: {
        body: [[1,1],[1,2],[1,3]],
        nextDirection: [0, 1]
    },
    state: false
};

//let board = [];
/*
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
*/

function genTable (){
    while (table.children.length){
        table.removeChild(table.children[0])
    }
    select = document.getElementById('select');
    for (let i=0; i<select.value;i++){
        let row = document.createElement('tr')
        for (let j = 0; j<select.value; j++){
            let newTd = document.createElement('td');
            row.appendChild(newTd)
        }
        table.appendChild(row);
    }
    console.log(table.children[0].children[0])
    table.children[1].children[1].classList.add('snake-body')
    table.children[1].children[2].classList.add('snake-body')
    table.children[1].children[3].classList.add('snake-body')
    gameState = {
        apple: [0, 0],
        snake: {
            body: [[1,1],[1,2],[1,3]],
            nextDirection: [0, 1]
        },
        state: false
    };
}



function tick () {
    if (gameState.state === true){
        let newSegment = []
        newSegment.push(gameState.snake.body[gameState.snake.body.length-1][0]+ gameState.snake.nextDirection[0])
        newSegment.push(gameState.snake.body[gameState.snake.body.length-1][1]+ gameState.snake.nextDirection[1])
        if (newSegment[0] > select.value-1 || newSegment[1] > select.value-1){
            gameState.state = false
            genTable()
            alert('Lost the snake :/')
        }

        console.log(newSegment)
        table.children[newSegment[0]].children[newSegment[1]].classList.toggle('snake-body')
        gameState.snake.body.push(newSegment)
        table.children[gameState.snake.body[0][0]].children[gameState.snake.body[0][1]].classList.toggle('snake-body')
        gameState.snake.body.shift()
        console.log(gameState.snake.body)

    }
}

boardButton.addEventListener('click', genTable)
window.addEventListener('keydown', function (event) {
    //left
    if (event.key === 'ArrowLeft'){
        gameState.snake.nextDirection = [0,-1]
    } 
    //up
    else if (event.key === 'ArrowUp'){
        gameState.snake.nextDirection = [-1,0]

    } 
    //right
    else if (event.key === 'ArrowRight'){
        gameState.snake.nextDirection = [0,1]

    }
    //down
    else if (event.key === 'ArrowDown'){
        gameState.snake.nextDirection = [1,0]
 
    }
    

})


playButton.addEventListener('click', function(){
    gameState.state = !gameState.state
} )

setInterval(tick, 500)
