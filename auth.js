const bcrypt= require('bcryptjs');
const express= require('express');
const router= express.Router();
const mongoose =require('mongoose');
const Joi= require('joi');
const {Detail,validateDetail}= require('./detail');
const {Update}= require('./update');

router.post('/',async (req,res)=>{
    
    const updates= await Update.find().sort('-date');
    const {error}= validateDetail(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);
    
    let user= await Detail.findOne({ email: req.body.email});
    if(user)
        return res.status(400).send("User Already Registered");
    
    let detail= new Detail({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    
    await detail.save();
    res.send({link:'/',message:"Your Details has been saved successfully"});
});

/*router.get('/details',async function(req,res){
    
    const details= await Detail.find().sort('name');
    res.render('index',{variable: details});
});*/

module.exports= router;