const Joi= require('joi');
const mongoose =require('mongoose'); 

const Update= mongoose.model('updates', new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    
    link:{
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now
    }
    })
);

function validateUpdate(update){    
        const schema= {
        text: Joi.string().min(3).max(10000).required(),
        link: Joi.string().min(0).max(300).required()
    };
    return Joi.validate(update, schema);
}

module.exports.Update= Update;
module.exports.validate=validateUpdate;