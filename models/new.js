var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td', { useNewUrlParser: true })
var Schema=mongooes.Schema
var news=new Schema({
	
	
	username:{
		type:String,
		required:true
	},
	avater:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	time:{
		type:String,
		required:true
	},
	img:{
		type:String,
		required:false
	}


})
module.exports=mongooes.model('News',news);