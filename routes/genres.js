// this file handles all the routes that associated with genres
// restructering the files to make things more maintainable ,put all the routes in different .js file in route folder
const mongoose=require('mongoose');
const express=require('express');
const {Genre, validate} = require('../models/genre');// importing the models and genre function to the file in object fashion
const router=express.Router();
const admin=require('../middleware/admin');
const auth=require('../middleware/auth');

// req is request and res is response, and we have made the function as async
  router.get('/', async(req, res) => {
    const genres=await Genre.find().sort('name');
    res.send(genres);
  });
  
  //entering a new genre, auth would be checked before adding data to the database
  router.post('/', auth,async(req, res) => {
      // since we cannot trust the users so we are validating the input and hence we are interested in the returned objects' error feildds value so instead of writing const resV= fun() ; const resB=resV['error], we can do tha in one simple way const {error}= fun()
      const { error } = validate(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
  
    // genre is being made let because we have to set its value to something that has been set by the database
    try{
      let genre =new Genre({name: req.body.name});
      genre=await genre.save();
      res.send(genre);      
    }
    catch(err)
    {
      console.log(err);
    }
    // return the new genre made
  });
  
 
  // updation of the genre
  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
  });
    
  // deletion of a genre 
  router.delete('/:id', [auth,admin],async(req, res) => {
    const genre =await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  
  // getting the details of particular genre id
  router.get('/:id', async(req, res) => {
    const genre =await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });
  
 
  module.exports=router;