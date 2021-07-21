const Joi= require('joi');
const mongoose =require('mongoose'); 

const Detail= mongoose.model('details', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    })
);

function validateDetail(detail){    
        const schema= {
        name: Joi.string().min(5).max(150).required(),
        email: Joi.string().min(5).max(60).required().email(),
        phone: Joi.string().min(10).max(10).required()
    };
    return Joi.validate(detail, schema);
}

module.exports.Detail= Detail;
module.exports.validateDetail=validateDetail;