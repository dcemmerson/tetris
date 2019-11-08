function queryDB(sql,values,mysql){
    return new Promise((resolve,reject) => {
	mysql.pool.query(sql,values,(err,results,fields) => {
	    if(err) reject(err);
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
    }
}
