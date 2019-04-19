const bcrypt=require('bcrypt');
const _=require('lodash');
const mongoose=require('mongoose');
const express=require('express');
const {User, validate} = require('../models/user');
const router=express.Router();

 router.post('/', async(req, res) => {
    // asking validate function which uses joi to tell if the post request has valid entries or not 
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // find if the user already with same email id exist or not
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already existing');
    // using pick rather then body.get
    user =new User(_.pick(req.body,['name','email','password']));
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);// salt is the random string that is prefix or suffix the password    await user.save();
    // lodash has .pick which selects the parms feilds
    await user.save();
    res.send(_.pick(user,['_id','name','email']));      
});

module.exports=router;