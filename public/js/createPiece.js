document.addEventListener('DOMContentLoaded',() => {
    jsColorPicker('input.color');
    document.getElementById('managePiecesButton').addEventListener('click',sizeGrid);
    document.getElementById('newPieceColor').addEventListener('change',updatePieceColor);
    $('#managePieces').on('shown.bs.modal',addCreatePieceEL);
    $('#managePieces').on('hidden.bs.modal',removeCreatePieceEL);
    document.getElementById('savePiece').addEventListener('click',savePiece);
});

function updatePieceColor(){
     let gridSquare = document.getElementsByClassName('createPieceGrid');
    let color = document.getElementById('newPieceColor').value;
    for(let i = 0; i < gridSquare.length; i++){
	if(gridSquare[i].getAttribute("data-selected") === "true") 
	    gridSquare[i].style.backgroundColor = color;
	else gridSquare[i].style.backgroundColor = "white";
    }
}
function addCreatePieceEL(){
    window.addEventListener('resize',sizeGrid);
     let gridSquare = document.getElementsByClassName('createPieceGrid');
    for(let i = 0; i < gridSquare.length; i++) gridSquare[i].addEventListener('click',highlight);
}
function removeCreatePieceEL(){
    window.removeEventListener('resize',sizeGrid);
    let gridSquare = document.getElementsByClassName('createPieceGrid');
    for(let i = 0; i < gridSquare.length; i++) gridSquare[i].removeEventListener('click',highlight);
}
function highlight(){
    if(this.getAttribute("data-selected") === "true"){
	this.style.backgroundColor = "white";
	this.setAttribute("data-selected","false");
    }
    else{
	this.style.backgroundColor = document.getElementById('newPieceColor').value;
	this.setAttribute("data-selected","true");
    }
}
function sizeGrid() {
    let width = (document.body.clientWidth * 0.85 * 0.33 / 4) - 10 + "px";
    let grid = document.getElementsByClassName('createPieceGrid');
    for(let i = 0; i < grid.length; i++){
	grid[i].style.maxHeight = grid[i].style.minHeight = width;
	grid[i].style.maxWidth = grid[i].style.minWidth = grid[i].style.minHeight;
    }
}
async function savePiece(){
    this.disabled = true;
    var context = {};
    context.name = document.getElementById('newPieceName').value;
    context.color = document.getElementById('newPieceColor').value;
    context.coordinates = [];

    let gridSquare = document.getElementsByClassName('createPieceGrid');

    for(let i = 0; i < gridSquare.length; i++)
	if(gridSquare[i].getAttribute('data-selected') === 'true')
	    context.coordinates.push({
		xCoord: gridSquare[i].getAttribute('data-col'),
		yCoord: gridSquare[i].getAttribute('data-row')
	    });

    let savePieceResponse = document.getElementById('savePieceResponse');
    try{
	const response = await fetch('/createNewPiece',{
	    method: 'POST',
	    body: JSON.stringify(context),
	    mode: 'cors',
	    cache: 'no-cache',
	    credentials: 'same-origin',
	    headers: {
		'Content-Type': 'application/json'
	    }
	})

	let result = await response.json();
	this.disabled = false;
	clearCreatePieceBoard();
	savePieceResponse.style.color = "green";
	savePieceResponse.innerText = "Saved!";
	removeFeedback(savePieceResponse);
    }
    catch(error){
	console.log(error);
	savePieceResponse.style.color = "red";
	savePieceResponse.innerText = "Server error. Unable to save!";
	removeFeedback(savePieceResponse);
    }
}
function clearCreatePieceBoard(){
    let gridSquare = document.getElementsByClassName('createPieceGrid');
    for(let i = 0; i < gridSquare.length; i++)
	gridSquare[i].setAttribute('data-selected','false');
    updatePieceColor();
}
function removeFeedback(){
    setTimeout(() => document.getElementById('savePieceResponse').innerText = "",3500);
}
