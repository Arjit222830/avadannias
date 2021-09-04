const Joi= require('joi');
const mongoose =require('mongoose'); 
const jwt= require('jsonwebtoken');
const config= require('config');

const AdminSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type:String
    }
});

const Admin= mongoose.model('admins', AdminSchema);

function validateAdmin(admin){    
        const schema= {
        name: Joi.string().min(5).max(150).required(),
        password: Joi.string().min(5).max(150).required(),
        confirmPassword: Joi.string().min(5).max(150)
    };
    return Joi.validate(admin, schema);
}

module.exports.Admin= Admin;
module.exports.validate=validateAdmin;