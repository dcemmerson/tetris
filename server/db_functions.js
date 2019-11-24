function queryDB(sql,values,mysql){
    return new Promise((resolve,reject) => {
	mysql.pool.query(sql,values,(err,results,fields) => {
	    if(err){
		console.log('db query rejecting');
		reject(err);
	    }
		else resolve(results);
	});
    });
}

module.exports = {
    getHighScores: function(res,mysql,start,packetSize){
	return new Promise((resolve,reject) => {
	    const sql = `SELECT username,score,level,rowsCleared FROM scores ORDER BY score DESC LIMIT ?,?`;
	    const values = [start,packetSize];
	    queryDB(sql,values,mysql)
		.then((results) => {
		    console.log(results);
		    if(results.length > 0) resolve(results);
		    else reject()
		})
		.catch(err => reject(err))
		    })
    },
    addUserScore: function(res,mysql,username,score,level,rowsCleared){
	return new Promise((resolve,reject) => {
	    let sql = `INSERT INTO scores (username,score,level,rowsCleared) VALUES (?,?,?,?)`;
	    let values = [username,score,level,rowsCleared];
	    queryDB(sql,values,mysql)
		.then((results) => {
		    console.log(results);
		    resolve(results);
		})
		.catch(err => reject(err))
		    })
    },
    addNewPiece: function (res,mysql,name,color,coords){
	return new Promise(async (resolve,reject) => {
	    let sql = `INSERT INTO pieces (name,color) VALUES (?,?)`;
	    let values = [name,color];
	    console.log(sql);
	    console.log(values);
	    try{
		let piece = await queryDB(sql,values,mysql)
		let promises = [];

		coords.forEach(coord => {
		    sql = `INSERT INTO coordinates (xCoord,yCoord,pieceId) VALUES (?,?,?)`;
		    values = [coord.xCoord,coord.yCoord,piece.insertId];
		    promises.push(queryDB(sql,values,mysql));
		});
		let results = await promises;
		resolve(results);
	    }
	    catch(err){
		console.log(err);
		reject(err);
	    }
	})
    },
    getAllPiecesList: function(res,mysql){
	return new Promise(async (resolve,reject) => {
	    let sql = `SELECT id,name,color FROM pieces`;
	    
	    try{
		let pieces = await queryDB(sql,null,mysql);
		resolve(pieces);
	    }
	    catch(err){
		console.log(err);
		reject(err);
	    }
	});
    },
    retrievePiece: function(res,mysql,pieceId){
	return new Promise(async (resolve,reject) => {
	    let sql = `SELECT xCoord,yCoord FROM coordinates WHERE pieceId=?`;
	    let values = [pieceId];
	    try{
		let pieces = await queryDB(sql,values,mysql);
		resolve(pieces);
	    }
	    catch(err){
		console.log(err);
		reject(err);
	    }
	});
    }
}
