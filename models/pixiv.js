var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td', { useNewUrlParser: true })
var Schema=mongooes.Schema
var pixiv=new Schema({
	
	tag:{
        type:[],
        required:false
    },
	info:{
		type:String,
		required:false
	},
	title:{
		type:String,
		required:false
	},
	author:{
		type:String,
		required:false
	},
	avater:{
		type:String,
		required:false

	},
	imgsrc:{
		type:String,
		required:false
    },
    Album:{
        type:String,
        required:false
    },
    time:{
        type:String,
        required:false
	}



})
module.exports=mongooes.model('Pixiv',pixiv);