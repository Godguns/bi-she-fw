var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td')
var Schema=mongooes.Schema
var userSchema=new Schema({
	tags:{
		type:[],
		required:false
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avater:{
		type:String,
		required:false
	},
	fork:{
		type:[],
		required:false
	},
	fans:{
		type:[],
		required:false
	},
	history:{
		type:[],
		required:false
	},
	collect:{
		type:[],
		required:false
	}
})
module.exports=mongooes.model('User',userSchema);