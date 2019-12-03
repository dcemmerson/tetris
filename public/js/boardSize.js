const MAX_BOARD_WIDTH = 250;
const MAX_NEXT_BOARD_WIDTH = 75;
let BLOCK_HEIGHT = document.getElementById('tetrisInnerContainer').height / BOARD_BLOCKS_HIGH;
let BLOCK_WIDTH = document.getElementById('tetrisInnerContainer').width / BOARD_BLOCKS_WIDE;
let NEXT_BLOCK_HEIGHT = document.getElementById('nextPieceCanvas').height / SQUARE;
let NEXT_BLOCK_WIDTH = document.getElementById('nextPieceCanvas').width/ SQUARE;
let NEXT_BOARD_WIDTH = document.getElementById('nextPieceCanvas').width;
let NEXT_BOARD_HEIGHT = document.getElementById('nextPieceCanvas').height;
let BOARD_WIDTH = document.getElementById('tetrisInnerContainer').width;
let BOARD_HEIGHT = document.getElementById('tetrisInnerContainer').height;

function resizeBoard(){
/*
    if(window.innerWidth >= (MAX_BOARD_WIDTH + MAX_NEXT_BOARD_WIDTH)){
	BOARD_WIDTH = MAX_BOARD_WIDTH;
	BOARD_HEIGHT = 2 * BOARD_WIDTH;
	NEXT_BOARD_WIDTH = NEXT_BOARD_HEIGHT = MAX_NEXT_BOARD_WIDTH;
    }
    else{
//	document.getElementById('tetrisInnerContainer').width = window.innerWidth;
//	document.getElementById('tetrisInnerContainer').height = window.innerHeight;
	BOARD_WIDTH = window.innerWidth * (250 / 325);
	BOARD_HEIGHT = 2 * BOARD_WIDTH;
	NEXT_BOARD_WIDTH = NEXT_BOARD_HEIGHT = window.innerWidth * (75 / 325);
    }

    BLOCK_HEIGHT = BOARD_HEIGHT / BOARD_BLOCKS_HIGH;
    BLOCK_WIDTH = BOARD_WIDTH / BOARD_BLOCKS_WIDE;
    NEXT_BLOCK_HEIGHT = NEXT_BOARD_HEIGHT / SQUARE;
    NEXT_BLOCK_WIDTH = NEXT_BOARD_WIDTH/ SQUARE;
  */  
}
