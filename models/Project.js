var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td')
var Schema=mongooes.Schema
var project=new Schema({
	name:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:false
    },
    xmstatus:{
        type:String,
        required:false

    },
	status:{
		type:String,
		required:true
	},
})
module.exports=mongooes.model('Project',project);