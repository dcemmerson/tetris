module.exports = function(app){
    app.get('/', function(req,res){
	var context = {};
	context.script = ['tetris.js','highScores.js','createPiece.js','boardSize.js','touchEvents.js', "plugins/colors.js", "plugins/colorPicker.data.js", "plugins/colorPicker.js", "plugins/jsColor.js", "plugins/defColors.js"];
	res.render('tetris',context);
    });
}
