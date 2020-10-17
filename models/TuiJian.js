var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td')
var Schema=mongooes.Schema
var tuijian=new Schema({
	username:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:false
	},
	avater:{
		type:String,
		required:true
	},
})
module.exports=mongooes.model('TuiJian',tuijian);