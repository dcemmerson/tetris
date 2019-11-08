const NUMBER_OF_SCORES_SHOWN = 3; //displayed in moving scores at top
const START_ANIMATION_POSITION = -550;
document.addEventListener('DOMContentLoaded', async function thisFunction(){
    document.getElementById('submitScore').addEventListener('click',submitScore);
    document.getElementById('hallOfFameLink').addEventListener('click',retrieveAllScores);
    
    try{
	let highScores = await fetchHighScores();
	highScoresAnimation(highScores.reduce((accum,curr,index) => (accum + 
								     ((index === 0) ? '1st'
								      : (index === 1) ? '2nd'
								      : (index === 2) ? '3rd'
								      : ' ')
								     + '. ' + curr.username.substring(0,10) 
								     + ' ' + curr.score
								     + ((index === 2) ? ' ' : ' *** ')), ''));
    }
    catch(err){
	console.log(err);
    }
});
async function retrieveAllScores(){
    let tableBody = document.getElementById('modalTableBody');
    while(tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);

    const PACKET_SIZE = 3;
    const TOTAL_FETCH = 1000;
    let start = 0;
    let continueFetch = true;
    let highScores = [];
    while(start < TOTAL_FETCH && continueFetch){
	try{
	    highScores.push(await fetchHighScores(start,PACKET_SIZE));
	    start += PACKET_SIZE;
	}
	catch{
	    continueFetch = false;
	}
    }
    let standing = 1;
    for(const highScore of highScores){
	await highScore;
	if(highScore.length > 0) populateHallOfFame(highScore,standing);
	standing += highScore.length;
    }
}
async function fetchHighScores(start=0,packetSize=NUMBER_OF_SCORES_SHOWN){
    //    document.getElementById('highScoresDiv').innerText = "high scores";
    let response = await fetch(`/getHighScores?start=${start}&packetSize=${packetSize}`,{
	method: 'GET',
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
	    'Content-Type': 'application/json'
	}
    })
    return response.json();
}
function highScoresAnimation(results){
 
    var animate = document.createElement('div');
    animate.innerText = results;
    animate.setAttribute('id','highScores');

    var secondAnimation = false;
    let position = START_ANIMATION_POSITION;
    animate.style.left = position + 'px';
    let docWidth = document.body.clientWidth;
    var interval = setInterval(frame,30);
    document.getElementById('highScoresContainer').appendChild(animate);

    function frame(){
	try{
	    if(position >= animate.parentNode.clientWidth){
		animate.remove();
		clearInterval(interval);
		highScoresAnimation(results);
	    }
	    position = position + 2;
	    animate.style.left = position + 'px';
	}
	catch{
	    clearInterval(interval);
	    throw('animate == null');
	}
    }
}

async function submitScore(event){
    event.preventDefault();
   
    this.disabled = true;
    this.value = "Saving...";
    document.getElementById('inputName').disabled = true;
    var context = {};
    context.username = document.getElementById('inputName').value;
    context.score = document.getElementById('tetrisScore').innerHTML;
    context.level = document.getElementById('tetrisLevel').innerHTML;
    context.rowsCleared = document.getElementById('tetrisLinesCleared').innerHTML;
    context.start = 0;
    context.packetSize = NUMBER_OF_SCORES_SHOWN;
    let response = await fetch('/submitUserScore',{
	method: 'POST',
	body: JSON.stringify(context),
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
	    'Content-Type': 'application/json'
	}
    })
    let results = await response.json();
    if(results === "failed") this.value = "Unable to save...";
    else{
	let highScoresContainer = document.getElementById('highScoresContainer');
	while(highScoresContainer.firstChild)
	    highScoresContainer.removeChild(highScoresContainer.firstChild);
	this.disabled = false
	this.value = "Save";
	document.getElementById('highScoreAlert').hidden = true;
	document.getElementById('inputName').disabled = false;
	document.getElementById('inputName').value = '';

	replay();
	highScoresAnimation(results.reduce((accum,curr,index) => (accum + 
								  ((index === 0) ? '1st'
								   : (index === 1) ? '2nd'
								   : (index === 2) ? '3rd'
								   : ' ')
								  + '. ' + curr.username.substring(0,10) 
								  + ' ' + curr.score
								  + ((index === 2) ? ' ' : ' *** ')), ''));	
    }
    
}

function populateHallOfFame(highScores,standing){
    let table = document.getElementById('modalTableBody');
    highScores.forEach(score => {
	let tr = document.createElement('tr');
	tr.setAttribute('scope','row');
	let td0 = document.createElement('td');
	td0.innerText = standing;
	standing++;
	let td1 = document.createElement('td');
	td1.innerText = score.username;
	let td2 = document.createElement('td');
	td2.innerText = score.score;
	let td3 = document.createElement('td');
	td3.innerText = score.level;
	let td4 = document.createElement('td');
	td4.innerText = score.rowsCleared;
	
	tr.appendChild(td0);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	table.appendChild(tr);
    })
}
