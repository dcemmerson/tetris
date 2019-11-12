let db = require('./db_functions.js');
module.exports = function(app,mysql){
    app.get('/getHighScores', function(req,res){
	console.log('inside getHighScores');
	try{
	    db.getHighScores(res,mysql,parseInt(req.query.start),parseInt(req.query.packetSize))
		.then(results => res.send(results))
		.catch(err => {
		    console.log('in the catch of gethighscore');
		    if(err) console.log(err);
		    res.end();
		});
	}
	catch{//so user cannot intentionally crash server
	    res.end();
	}
    });
    app.post('/submitUserScore', function(req,res){
	db.addUserScore(res,mysql,req.body.username,req.body.score,req.body.level,req.body.rowsCleared)
	    .then(() => db.getHighScores(res,mysql,parseInt(req.body.start),parseInt(req.body.packetSize)))
	    .then(results => res.send(results))
	    .catch(err => {
		console.log(err);
		res.send('failed');
		
	    });
    });
}
	     
