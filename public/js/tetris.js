const SQUARE = 4; //represents the hidden 4x4 grid that each block fits in
const BOARD_BLOCKS_WIDE = 10;
const BOARD_BLOCKS_HIGH = 20;
const BLOCK_HEIGHT = document.getElementById('tetrisInnerContainer').height / BOARD_BLOCKS_HIGH;
const BLOCK_WIDTH = document.getElementById('tetrisInnerContainer').width / BOARD_BLOCKS_WIDE;
const NEXT_BLOCK_HEIGHT = document.getElementById('nextPieceCanvas').height / SQUARE;
const NEXT_BLOCK_WIDTH = document.getElementById('nextPieceCanvas').width/ SQUARE;
const NEXT_BOARD_WIDTH = document.getElementById('nextPieceCanvas').width;
const NEXT_BOARD_HEIGHT = document.getElementById('nextPieceCanvas').height;
const BOARD_WIDTH = document.getElementById('tetrisInnerContainer').width;
const BOARD_HEIGHT = document.getElementById('tetrisInnerContainer').height;
const POINTS_PER_PIECE = 10;
const POINTS_PER_ROW = 100;
const MILLISECONDS_FACTOR = 2000; //used to base how fast pieces fall
const LEVEL_CHANGE_LINES = 5; //increment level every this many points
const START_LEVEL = 1;
const START_SCORE = 0;
const START_LINES_CLEARED = 0;

const ROTATE = [[0,-1],[1,0]];
//const ROTATE = [{col:0,row:-1},{col:1,row:0}];
//const ROTATE = [[-1,0],[0,1]];

const START_X = BOARD_BLOCKS_WIDE / 2;
const START_Y = 0;

const testPiece = {
    dir: [{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:3,row:1}],
    color: "cyan",
    currDir: 0,
    currX: START_X,
    currY: START_Y
}
const pieces = [
/*
{
    dir: [[{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:3,row:1}]],
    color: "cyan",
    currDir: 0,
    currX: START_X,
    currY: START_Y
}
*/
    {
	dir:[//l
	    [{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:3,row:1}],
	    [{col:2,row:0},{col:2,row:1},{col:2,row:2},{col:2,row:3}],
	    [{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:3,row:1}],
	    [{col:1,row:0},{col:1,row:1},{col:1,row:2},{col:1,row:3}]
	],
	color: "cyan",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },

    {
	dir: [//L
	    [{col:0,row:0},{col:1,row:0},{col:1,row:1},{col:1,row:2}],
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:2,row:1}],
	    [{col:1,row:0},{col:1,row:1},{col:1,row:2},{col:2,row:2}],
	    [{col:0,row:2},{col:0,row:1},{col:1,row:1},{col:2,row:1}]
	],
	color: "blue",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [//j
	    [{col:1,row:0},{col:1,row:1},{col:1,row:2},{col:0,row:2}],
	    [{col:0,row:1},{col:0,row:2},{col:1,row:2},{col:2,row:2}],
	    [{col:2,row:0},{col:1,row:0},{col:1,row:1},{col:1,row:2}],
	    [{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:2,row:2}]
	]    ,
	color: "green",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [//T
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:1,row:1}],
	    [{col:1,row:1},{col:1,row:2},{col:1,row:3},{col:2,row:2}],
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:1,row:3}],
	    [{col:1,row:1},{col:1,row:2},{col:1,row:3},{col:0,row:2}]
	],
	color: "yellow",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [//s
	    [{col:0,row:2},{col:1,row:2},{col:1,row:1},{col:2,row:1}],
	    [{col:1,row:0},{col:1,row:1},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:2},{col:2,row:2},{col:2,row:1},{col:3,row:1}],
	    [{col:2,row:0},{col:2,row:1},{col:3,row:1},{col:3,row:2}]
	],
	color: "red",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [//z
	    [{col:0,row:1},{col:1,row:1},{col:1,row:2},{col:2,row:2}],
	    [{col:1,row:2},{col:1,row:1},{col:2,row:1},{col:2,row:0}],
	    [{col:1,row:1},{col:2,row:1},{col:2,row:2},{col:3,row:2}],
	    [{col:1,row:2},{col:1,row:1},{col:2,row:1},{col:2,row:0}]
	],
	color: "orange",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [//o
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}]
	],
	color: "purple",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    }
];

window.addEventListener('DOMContentLoaded',() => {
    playTetris();
});
function playTetris(){
    spawnNextPiece();
    document.getElementById('tetrisLinesCleared').innerText = START_LINES_CLEARED;
    document.getElementById('tetrisScore').innerText = START_SCORE;
    document.getElementById('tetrisLevel').innerText = START_LEVEL;
    var arr = createArray();
    var currPiece;
    var timeout = autoMoveDown();
    document.addEventListener('keydown',keyEvent);
    runTetris();
    
    function keyEvent(event){
	try{
	    if(moveEvent(event,currPiece,arr) && event.key == "ArrowDown"){
		clearTimeout(timeout);
		runTetris();
	    }
	}
	catch{
	    console.log('game is over');
	}
    }
    async function runTetris(){
	if(!currPiece || currPiece.locked){
	    clearTimeout(timeout);
	    currPiece = spawnPiece(arr);
	}
	if(currPiece) timeout = autoMoveDown();
	else{ //gameover
	    document.removeEventListener('keydown',keyEvent);
	    document.getElementById('gameover').hidden = false;
	    let score =  document.getElementById('tetrisScore').innerText;
	    document.getElementById('finalScore').value = score;
	    let highScores = await fetchHighScores();
	    if(score > highScores[highScores.length - 1].score) document.getElementById('highScoreAlert').hidden = false;
	}
    }
    function autoMoveDown(){
	return setTimeout(() =>{
	    var e = new KeyboardEvent("keydown", 
				      {bubbles: true, cancelable: true, key: "ArrowDown", charCode: 0,keyCode: 40});
	    document.getElementsByTagName('body')[0].dispatchEvent(e);
	    //	autoMoveDown();
	    runTetris();
	},MILLISECONDS_FACTOR / parseInt(document.getElementById('tetrisLevel').innerText))}
}
function replay(){
    //clear entire gameboard
    let canvas = document.getElementById('tetrisInnerContainer');
    let context = canvas.getContext('2d');
    context.fillStyle = "white";
    context.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);

    document.getElementById('gameover').hidden = true;
    playTetris();
}

function spawnPiece(arr){
    let nextPiece = JSON.parse(JSON.stringify(pieces[parseInt(document.getElementById('nextPiece').value)])); //force copy of random piece
    addToBoard(nextPiece);
    spawnNextPiece();
    if(checkIfValidSpawn(nextPiece,arr)) return nextPiece;
    else return false; 
}
function spawnNextPiece(){
    let randInt = getRandomInt(pieces.length);
    let nextPiece = JSON.parse(JSON.stringify(pieces[randInt])); //force copy of random piece
    document.getElementById('nextPiece').value = randInt;
    addToNextBoard(nextPiece);
}
function addToNextBoard(piece){
    let canvas = document.getElementById('nextPieceCanvas');
    let context = canvas.getContext('2d');
    context.clearRect(0,0,NEXT_BOARD_WIDTH,NEXT_BOARD_HEIGHT);
    context.fillStyle = piece.color;
    piece.dir[piece.currDir].forEach((pieceCoords) => {
	(pieceCoords.col === 3) ? 
	context.fillRect((pieceCoords.col) * NEXT_BLOCK_WIDTH,
			 (pieceCoords.row) * NEXT_BLOCK_HEIGHT,
			 NEXT_BLOCK_WIDTH - 2,
			 NEXT_BLOCK_HEIGHT - 1)
	    : context.fillRect((pieceCoords.col) * NEXT_BLOCK_WIDTH,
				 (pieceCoords.row) * NEXT_BLOCK_HEIGHT,
				 NEXT_BLOCK_WIDTH - 1,
				 NEXT_BLOCK_HEIGHT - 1);
    });
}
//CAUTION: must check if piece is in valid location before calling addToArray!!
function addToBoard(piece){
    let canvas = document.getElementById('tetrisInnerContainer');
    let context = canvas.getContext('2d');
    context.fillStyle = piece.color;
    piece.dir[piece.currDir].forEach((pieceCoords) => {
	context.fillRect((piece.currX + pieceCoords.col) * BLOCK_WIDTH,
			 (piece.currY + pieceCoords.row) * BLOCK_HEIGHT,
			 BLOCK_WIDTH - 1,
			 BLOCK_HEIGHT - 1)
    });
}
function drawBlock(x,y,color,context){
    context.fillStyle = color;
    context.fillRect(x * BLOCK_WIDTH,y * BLOCK_HEIGHT,BLOCK_WIDTH - 1,BLOCK_HEIGHT - 1);
}
function removeBlock(x,y){
    let canvas = document.getElementById('tetrisInnerContainer');
    let context = canvas.getContext('2d');
    context.clearRect(x * BLOCK_WIDTH,y * BLOCK_HEIGHT,BLOCK_WIDTH,BLOCK_HEIGHT);
}
function addToArray(piece,arr){
    piece.dir[piece.currDir].forEach((pieceCoords) => {
	arr[piece.currY + pieceCoords.row][piece.currX + pieceCoords.col] = piece.color;
    })
}
function removeFromArray(piece,arr){
    piece.dir[piece.currDir].forEach(pieceCoords => {
	arr[piece.currY + pieceCoords.row][piece.currX + pieceCoords.col] = 0;
    })
}
/***************************************** Movement *********************************************/
function moveEvent(event,currPiece,arr){
    if(currPiece.locked || event.key === "ArrowDown" || event.key === "ArrowUp" 
       || event.key === "ArrowRight" || event.key === "ArrowLeft") event.preventDefault();
    else return false;
    
    if(checkIfValidMove(event.key,currPiece,arr)){
	movePiece(event.key,currPiece); //make the move
	return true;
    }
    else{
	if(event.key === "ArrowDown"){
	    addToArray(currPiece,arr);
	    currPiece.locked = true;
	    addPoints(POINTS_PER_PIECE);
	    checkIfRowComplete(arr);
	    return true;
	}
    }
}
function movePiece(key,currPiece){
    currPiece.dir[currPiece.currDir].forEach((pieceCoords) => {
	removeBlock(currPiece.currX + pieceCoords.col,currPiece.currY + pieceCoords.row);
    });
    
    if(key === "ArrowRight") currPiece.currX++;
    else if(key === "ArrowLeft") currPiece.currX--;
    else if(key === "ArrowDown") currPiece.currY++;
    else if(key === "ArrowUp") currPiece.currDir = (currPiece.currDir + 1) % 4;
    
    addToBoard(currPiece);
}
//returns true or false
function checkIfValidMove(key,currPiece,arr){
    let tempX = currPiece.currX;
    let tempY = currPiece.currY;
    let tempDir = currPiece.currDir;

    if(key === "ArrowRight") tempX++; 
    else if(key === "ArrowLeft") tempX--;
    else if(key === "ArrowDown") tempY++;
    else if(key === "ArrowUp"){
	tempDir = (currPiece.currDir + 1) % 4;
    }
    let returnValue = true;
     currPiece.dir[tempDir].forEach(pieceCoords => {
	if((pieceCoords.col + tempX) < 0 || (pieceCoords.col + tempX) >= BOARD_BLOCKS_WIDE
		|| (pieceCoords.row + tempY) >= (BOARD_BLOCKS_HIGH)) returnValue = false;
	else if(arr[pieceCoords.row + tempY][pieceCoords.col + tempX]) returnValue = false;;	
	
    });
    return returnValue;
}
function checkIfValidSpawn(currPiece,arr){
    let returnValue = true;
     currPiece.dir[currPiece.currDir].forEach(pieceCoords => {
	 arr[pieceCoords.row + currPiece.currY][pieceCoords.col + currPiece.currX] ? returnValue = false : null;
     });
    return returnValue;
}
function checkIfRowComplete(arr){
    let redraw = false;
    arr.forEach((row,index) => {
	let count = 0;
	row.forEach((element,index2) => element ? count++ : null);
	if(count === BOARD_BLOCKS_WIDE){
	    console.log(arr);
	    removeRow(arr,index);
	    addPoints(POINTS_PER_ROW);
	    addLineCleared();
	    redraw = true;
	}
    });
    if(redraw){

	clearAndReDraw(arr);
	console.log(arr);
    }
}
function clearAndReDraw(arr){
    let canvas = document.getElementById('tetrisInnerContainer');
    let context = canvas.getContext('2d');
    context.clearRect(0,0,BLOCK_WIDTH * BOARD_BLOCKS_WIDE,BLOCK_HEIGHT * BOARD_BLOCKS_HIGH);
    arr.forEach((row,rowIndex) => {
	row.forEach((color,colIndex) => {
	    color ? drawBlock(colIndex,rowIndex,color,context) : null;
	})
    })
}
function removeRow(arr,index){
    arr.splice(index,1);
    arr.unshift(new Array(BOARD_BLOCKS_WIDE).fill(0));
}
/************************************** MISC FUNCTIONS ******************************************/
function createArray(){
    var arr = new Array(BOARD_BLOCKS_WIDE);
    for(let i = 0; i < BOARD_BLOCKS_HIGH; ++i){
	let arrRow = new Array(BOARD_BLOCKS_WIDE).fill(0);
	arr[i] = arrRow;
    }
    return arr;
}
//getRandomInt(max) taken sraight off MDN
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function addPoints(points){
    let scoreSpan = document.getElementById('tetrisScore')
    let oldScore = parseInt(scoreSpan.innerText);
    let newScore = oldScore + points;
    scoreSpan.innerText = newScore;
}
function addLineCleared(){
   let linesSpan = document.getElementById('tetrisLinesCleared')
    let oldLines = parseInt(linesSpan.innerText);
    let newLines = oldLines + 1;
    linesSpan.innerText = newLines;
    if(newLines % LEVEL_CHANGE_LINES === 0)
	document.getElementById('tetrisLevel').innerText = parseInt(document.getElementById('tetrisLevel').innerText) + 1;

}
//do a 90deg cc linear transformation, then make sure piece is still on board
function rotate(dir){
    //[ROTATE] * [dir]
    let newDirection = dir.map(block => {
	return {col:ROTATE[1][0] * block.row + ROTATE[1][1] * block.col,
		row:ROTATE[0][0] * block.row + ROTATE[0][1] * block.col};
    });
    
    var moved;
    //now make sure block still falls on 4x4 grid
    do{
	moved = false;
	newDirection.forEach(block => {
	    if(block.col < 0){newDirection.forEach(eachBlock => eachBlock.col += (-block.col)); moved = true;}
	    if(block.row < 0){newDirection.forEach(eachBlock => eachBlock.row += (-block.row)); moved = true;}
	});
    }while(moved);
    
    return newDirection;
}
