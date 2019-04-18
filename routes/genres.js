// restructering the files to make things more maintainable ,put all the routes in different .js file in route folder
const mongoose=require('mongoose');
const express=require('express');
const {Genre, validate} = require('../models/genre');
const router=express.Router();

// req is request and res is response, and we have made the function as async
  router.get('/', async(req, res) => {
    const genres=await Genre.find().sort('name');
    res.send(genres);
  });
  
  // entering a new genre
  router.post('/', async(req, res) => {
      // since we cannot trust the users so we are validating the input and hence we are interested in the returned objects' error feildds value so instead of writing const resV= fun() ; const resB=resV['error], we can do tha in one simple way const {error}= fun()
      const { error } = validateGenre(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
  
    // genre is being made let because we have to set its value to something that has been set by the database
    let genre =new Genre({name: req.body.name});
    genre=await genre.save();
    // return the new genre made
    res.send(genre);
  });
  
  // updation of the genre
  router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
  });
    
  // deletion of a genre 
  router.delete('/:id', async(req, res) => {
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