const Joi= require('joi');
const mongoose =require('mongoose'); 

const Update= mongoose.model('updates', new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    
    file:[{
        data: Buffer,
        contentType: String
    }],

    
    date: {
        type: Date,
        default: Date.now
    }
    })
);

function validateUpdate(update){    
        const schema= {
        text: Joi.string().min(3).max(10000).required(),
        file: Joi.string().min(0).max(300).required()
    };
    return Joi.validate(update, schema);
}

module.exports.Update= Update;
module.exports.validate=validateUpdate;