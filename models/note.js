var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td', { useNewUrlParser: true })
var Schema=mongooes.Schema
var note=new Schema({
	
	imgsrc:{
        type:String,
        required:true

    },
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



})
module.exports=mongooes.model('Note',note);