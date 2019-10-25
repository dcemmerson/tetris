module.exports = function(app){
    app.get('/', function(req,res){
	var context = {};
	context.script = ['tetris.js'];
	res.render('tetris',context);
    });
}
