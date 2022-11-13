let table = document.getElementById('table');
let boardButton = document.getElementById('boardButton');
let select = document.getElementById('select');
let playButton = document.getElementById('playButton');
let scoreMessage =document.getElementById('score')
let scoreNum= 0

let gameState = {
    apple: [4, 4],
    snake: {
        body: [[1,1],[1,2],[1,3]],
        nextDirection: [0, 1]
    },
    state: false,
    collision: false
};

function dupeCheck (arr){
    for (let i = 0 ; i<arr.length-1;i++){
        //console.log('comparing:'+[arr[arr.length-1][0],arr[arr.length-1][1]]+)
        if(arr[arr.length-1][0]===arr[i][0] && arr[arr.length-1][1]===arr[i][1]){
            gameState.collision = true
        }
    }
}

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
    gameState = {
        apple: [4, 4],
        snake: {
            body: [[1,1],[1,2],[1,3]],
            nextDirection: [0, 1]
        },
        state: false,
        collision: false
    };
    table.children[1].children[1].classList.add('snake-body')
    table.children[1].children[2].classList.add('snake-body')
    table.children[1].children[3].classList.add('snake-body')
    table.children[gameState.apple[0]].children[gameState.apple[1]].classList.add('apple')
    playButton.innerText = 'Play'

}

function genApple (){
    gameState.apple.push(Math.floor(Math.random()*select.value));
    gameState.apple.push(Math.floor(Math.random()*select.value));
}


function tick () {
    if (gameState.state === true){
        dupeCheck(gameState.snake.body)
        let newSegment = []
        
        newSegment.push(gameState.snake.body[gameState.snake.body.length-1][0]+ gameState.snake.nextDirection[0])
        newSegment.push(gameState.snake.body[gameState.snake.body.length-1][1]+ gameState.snake.nextDirection[1])
        if (newSegment[0] > select.value-1 || newSegment[1] > select.value-1|| newSegment[0]<0 || newSegment[1]<0|| gameState.collision === true) {
            gameState.state = false
            genTable()
            return
        }
        table.children[newSegment[0]].children[newSegment[1]].classList.toggle('snake-body')
        gameState.snake.body.push(newSegment)
        if(newSegment[0] === gameState.apple[0] && newSegment[1] === gameState.apple[1]){
            table.children[gameState.apple[0]].children[gameState.apple[1]].classList.remove('apple')
            gameState.apple = []
            genApple()
            console.log(gameState.apple)
            table.children[gameState.apple[0]].children[gameState.apple[1]].classList.add('apple')
            scoreNum++
            scoreMessage.innerText = scoreNum
            console.log()
            
        } else{
            table.children[gameState.snake.body[0][0]].children[gameState.snake.body[0][1]].classList.toggle('snake-body')
            gameState.snake.body.shift()
        }
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
    playButton.innerText= 'Pause'
    scoreNum = 0

} )

setInterval(tick, 500)
