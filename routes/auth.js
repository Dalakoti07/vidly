const config=require('config');
const jwt=require('jsonwebtoken');
const Joi=require('Joi');
const bcrypt=require('bcrypt');
const _=require('lodash');
const mongoose=require('mongoose');
const express=require('express');
const {User} = require('../models/user');
const router=express.Router();

 router.post('/', async(req, res) => {
    // asking validate function which uses joi to tell if the post request has valid entries or not 
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // find if the user already with same email id exist or not
    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email id');

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid password');
    // sending a jsonwebtoken 
    const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    res.send(token);
});
function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password:Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }
module.exports=router;