const BOARD_BLOCKS_WIDE = 10;
const BOARD_BLOCKS_HIGH = 20;
const BLOCK_HEIGHT = document.getElementById('tetrisInnerContainer').height / BOARD_BLOCKS_HIGH;
const BLOCK_WIDTH = document.getElementById('tetrisInnerContainer').width / BOARD_BLOCKS_WIDE;
const BOARD_HEIGHT = document.getElementById('tetrisInnerContainer').height;
const BOARD_WIDTH = document.getElementById('tetrisInnerContainer').width;

const START_X = BOARD_BLOCKS_WIDE / 2;
const START_Y = 0;

const SQUARE = 4; //represents the hidden 4x4 grid that each block fits in

const pieces = [
    {
	dir:[
	    [{col:1,row:0},{col:1,row:1},{col:1,row:2},{col:1,row:3}],
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:3,row:2}],
	    [{col:1,row:0},{col:1,row:1},{col:1,row:2},{col:1,row:3}],
	    [{col:2,row:0},{col:2,row:1},{col:2,row:2},{col:2,row:3}]
	],
	color: "cyan",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [
	    [{col:0,row:1},{col:1,row:1},{col:1,row:2},{col:1,row:3}],
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:2,row:1}],
	    [{col:1,row:1},{col:1,row:2},{col:1,row:3},{col:2,row:3}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:2},{col:3,row:2}]
	],
	color: "blue",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [
	    [{col:2,row:1},{col:1,row:1},{col:1,row:2},{col:1,row:3}],
	    [{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:2,row:2}],
	    [{col:2,row:1},{col:2,row:2},{col:2,row:3},{col:1,row:3}],
	    [{col:1,row:2},{col:1,row:3},{col:2,row:3},{col:4,row:4}]
	]    ,
	color: "green",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:1,row:1}],
	    [{col:1,row:1},{col:1,row:2},{col:1,row:3},{col:2,row:2}],
	    [{col:0,row:2},{col:1,row:2},{col:2,row:2},{col:1,row:3}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:3},{col:0,row:2}]
	],
	color: "yellow",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [
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
	dir: [
	    [{col:0,row:1},{col:1,row:1},{col:1,row:2},{col:2,row:2}],
	    [{col:1,row:2},{col:1,row:1},{col:2,row:1},{col:2,row:0}],
	    [{col:1,row:1},{col:2,row:1},{col:2,row:2},{col:3,row:2}],
	    [{col:1,row:2},{col:1,row:1},{col:2,row:1},{col:2,row:0}]
	],
	color: "red",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    },
    {
	dir: [
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}],
	    [{col:1,row:1},{col:1,row:2},{col:2,row:1},{col:2,row:2}]
	],
	color: "red",
	currDir: 0,
	currX: START_X,
	currY: START_Y
    }
]


window.addEventListener('DOMContentLoaded',() => {
    var arr = createArray();
    var currPiece;
    var free = false;
    runTetris();
    
    function runTetris(){
	if(!free){
	    clearTimeout(timeout);
	    document.removeEventListener('keydown',event => (free = moveEvent(event,currPiece,arr)));
	    currPiece = spawnPiece(arr);
	    document.addEventListener('keydown',event => (free = moveEvent(event,currPiece,arr)));
	}
	var timeout = autoMoveDown();
	setTimeout(runTetris,5000);
    }
});

function autoMoveDown(){
    return setTimeout(() =>{
	var e = new KeyboardEvent("keydown", 
				  {bubbles: true, cancelable: true, key: "ArrowDown", charCode: 0,keyCode: 40});
	document.getElementsByTagName('body')[0].dispatchEvent(e);
//	autoMoveDown();
    },1000)
}
function spawnPiece(arr){
    let nextPiece = JSON.parse(JSON.stringify(pieces[getRandomInt(pieces.length - 1)])); //make copy of rand piece
    addToBoard(nextPiece);
    return nextPiece;
}

//CAUTION: must check if piece is in valid location before calling addToArray!!
function addToBoard(piece){
    piece.dir[piece.currDir].forEach((pieceCoords) => {
	drawBlock(piece.currX + pieceCoords.col,piece.currY + pieceCoords.row,piece.color);
    });
}
/*
function addToBoard(startX,startY,piece){
    for(let i = 0; i < SQUARE; ++i){
	for(let j = 0; j < SQUARE; ++j){
	    piece.dir[piece.currDir].forEach((pieceCoords) => {
		if(pieceCoords.col === i && pieceCoords.row ===j){
//		    arr[startX + i][startY + j] = piece.color;
		    drawBlock(startX + i, startY + j,piece.color);
		}
	    })
	}
    }
}
*/
function drawBlock(x,y,color){
    let canvas = document.getElementById('tetrisInnerContainer');
    let context = canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(x * BLOCK_WIDTH,y * BLOCK_HEIGHT,BLOCK_WIDTH,BLOCK_HEIGHT);
}
function removeBlock(x,y){
    let canvas = document.getElementById('tetrisInnerContainer');
    let context = canvas.getContext('2d');
    context.clearRect(x * BLOCK_WIDTH,y * BLOCK_HEIGHT,BLOCK_WIDTH,BLOCK_HEIGHT);
}
function addToArray(piece,arr){
    piece.dir[piece.currDir].forEach((pieceCoords) => {
	arr[piece.currX][piece.currY] = piece.color;
    })
}
/***************************************** Movement *********************************************/
//moveEvent returns false if piece is locked in place and a new piece should spawn
function moveEvent(event,currPiece,arr){
    if(event.key === "ArrowDown" || event.key === "ArrowUp" 
       || event.key === "ArrowRight" || event.key === "ArrowLeft") event.preventDefault();
    else return true;
    console.log(checkIfValidMove(event.key,currPiece,arr));
    if(checkIfValidMove(event.key,currPiece,arr)) movePiece(event.key,currPiece); //make the move
    else{
	console.log(false); 
	if(event.key === "ArrowDown"){
	    addToArray(currPiece,arr)
	    return false;
	}
	
	return true;    
    }
}
function movePiece(key,currPiece){
//    let canvas = document.getElementById('tetrisInnerContainer');
//    let context = canvas.getContext('2d');
    currPiece.dir[currPiece.currDir].forEach((pieceCoords) => {
	removeBlock(currPiece.currX + pieceCoords.col,currPiece.currY + pieceCoords.row);
    });
    
    if(key === "ArrowRight") currPiece.currX++; //currPiece.dir.forEach(element => ++element.col);
    else if(key === "ArrowLeft") currPiece.currX--; // currPiece.dir.forEach(element => --element.col);
    else if(key === "ArrowDown")currPiece.currY++;// currPiece.dir.forEach(element => ++element.row);
    else if(key === "ArrowUp"){
	curPiece.dir = currPiece.dir[(currPiece.currDir + 1) % 4].slice();
	curPiece.currDie = (currPiece.currDir + 1) % 4;
    }
    addToBoard(currPiece);
}
//returns true or false
function checkIfValidMove(key,currPiece,arr){
    let tempX = currPiece.currX;
    let tempY = currPiece.currY;

    if(key === "ArrowRight") tempX++; //currPiece.dir.forEach(element => ++element.col);
    else if(key === "ArrowLeft") tempX--; // currPiece.dir.forEach(element => --element.col);
    else if(key === "ArrowDown") tempY++;// currPiece.dir.forEach(element => ++element.row);
    else if(key === "ArrowUp"){
	curPiece.dir = currPiece.dir[(currPiece.currDir + 1) % 4].slice();
	curPiece.currDie = (currPiece.currDir + 1) % 4;
    }
    let returnValue = true;
    currPiece.dir[currPiece.currDir].forEach(pieceCoords => {
	if((pieceCoords.col + tempX) <= 0 || (pieceCoords.col + tempX) >= BOARD_BLOCKS_WIDE
		|| (pieceCoords.row + tempY) >= (BOARD_BLOCKS_HIGH)) returnValue = false;
	else if(arr[pieceCoords.col + tempX][pieceCoords.row + tempY]) returnValue = false;;	
	
    });
    return returnValue;
}
/************************************** MISC FUNCTIONS ******************************************/
function createArray(){
    var arr = new Array(BOARD_BLOCKS_WIDE);
    for(let i = 0; i < BOARD_BLOCKS_WIDE; ++i){
	let arrCol = new Array(20).fill(0);
	arr[i] = arrCol;
    }
    return arr;
}
//getRandomInt(max) taken straight off MDN
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
