var ongoingTouches = [];

function startTouchELs(){
    let startX;
    let startY;
    let canvas = document.getElementById('tetrisInnerContainer');
    canvas.addEventListener('touchstart',handleStart,false);
    canvas.addEventListener('touchend',handleEnd,false);
    //    canvas.addEventListener('touchcancel',handleCancel);
    //    canvas.addEventListener('touchmove',handleMove);

    function handleStart(event){
	event.preventDefault();
	startX = event.pageX;
	startY = event.pageY;
    }
    function handleEnd(event){
//	event.preventDefault();
	let deltaX = startX - event.pageX;
	let deltaY = startY - event.pageY;
	let tetst = BOARD_HEIGHT;
	if(Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20){ //rotate piece
	    var e = new KeyboardEvent("keydown", 
				      {bubbles: true, cancelable: true, key: "ArrowUp", charCode: 0,keyCode: 38});
	    document.getElementsByTagName('body')[0].dispatchEvent(e);
	}
	else if(deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)){ //move piece left
	    var e = new KeyboardEvent("keydown", 
				      {bubbles: true, cancelable: true, key: "ArrowLeft", charCode: 0,keyCode: 37});
	    document.getElementsByTagName('body')[0].dispatchEvent(e);
	}
	else if(deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)){ //move piece right
	    var e = new KeyboardEvent("keydown", 
				      {bubbles: true, cancelable: true, key: "ArrowRight", charCode: 0,keyCode: 39});
	    document.getElementsByTagName('body')[0].dispatchEvent(e);
	}
	else if(Math.abs(deltaX) < 20 && (deltaY <= -20 && deltaY >= -BOARD_HEIGHT / 2)){ //move piece one block down
	    var e = new KeyboardEvent("keydown", 
				      {bubbles: true, cancelable: true, key: "ArrowDown", charCode: 0,keyCode: 40});
	    document.getElementsByTagName('body')[0].dispatchEvent(e);
	}
	else if(Math.abs(deltaX) < 20 && deltaY < -BOARD_HEIGHT / 2){ //move piece all the way down
	    var e = new KeyboardEvent("keydown", 
				      {bubbles: true, cancelable: true, key: "ArrowDown", charCode: 0,keyCode: 40});
	    document.getElementsByTagName('body')[0].dispatchEvent(e);
	}
    }
}
