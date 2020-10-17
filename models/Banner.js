var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td')
var Schema=mongooes.Schema
var banner=new Schema({
	
	
	banner:{
		type:String,
		required:true
	},
	info:{
		type:String,
		required:true
	},
})
module.exports=mongooes.model('Bannner',banner);