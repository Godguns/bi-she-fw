var mongooes=require('mongoose')
mongooes.connect('mongodb://localhost/td')
var Schema=mongooes.Schema
var isOnline=new Schema({
	username:{
		type:String,
		required:true
	},
	
	avater:{
		type:String,
		required:true
    },
    socket_id:{
        type:String,
        required:true
    }
})
module.exports=mongooes.model('Isonline',isOnline);