const Joi= require('joi');
const mongoose =require('mongoose'); 

const quizSchema= new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    
    options:{
        A:{
            type: String,
            required: true
        },
        B:{
            type: String,
            required: true
        },
        C:{
            type: String,
            required: true
        },
        D:{
            type: String,
            required: true
        }
    },
    
    correctOption:{
        type:String,
        required:true
    }
});

const Quiz= mongoose.model('quizzes',quizSchema);

function validateQuiz(quiz){    
        const schema= {
        question: Joi.string().required(),
        A:Joi.string().required(),
        B:Joi.string().required(),
        C:Joi.string().required(),
        D:Joi.string().required(),   
        correctOption: Joi.string().required()
        
    };
    return Joi.validate(quiz, schema);
}

module.exports.Quiz= Quiz;
module.exports.validate= validateQuiz;