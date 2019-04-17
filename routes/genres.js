// restructering the files to make things more maintainable ,put all the routes in different .js file in route folder
const express=require('express');
const router=express.Router();
// genres is the list of dictionary objects
const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];
  
  // req is request and res is response
  router.get('/', (req, res) => {
    res.send(genres);
  });
  
  // entering a new genre
  router.post('/', (req, res) => {
      // since we cannot trust the users so we are validating the input and hence we are interested in the returned objects' error feildds value so instead of writing const resV= fun() ; const resB=resV['error], we can do tha in one simple way const {error}= fun()
      const { error } = validateGenre(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
  
    const genre = {
      id: genres.length + 1,
      name: req.body.name
    };
    genres.push(genre);
    // return the new genre made
    res.send(genre);
  });
  
  // updation of the genre
  router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
  });
  
  // deletion of a genre 
  router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });
  
  // getting the details of particular genre id
  router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });
  
  // this is a validate function 
  function validateGenre(genre) {
    // we are using a joi module to validate a string 
    // syntax is name should be string and minimum of length 3 and it must not be null 
      const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }
  
  module.exports=router;