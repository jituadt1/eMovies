const express = require('express')
const Joi = require('joi')
const app = express();

app.use(express.json());

const port = 3000; 
app.listen(port , () => console.log(`Litsening on port ${port}.....`));

const movies = [
    
    { movieId: 1, movieName:'Avengers'},
    { movieId: 2, movieName:'Spider-Man'},
    { movieId: 3, movieName:'Superman'},
    { movieId: 4, movieName:'Supergirl'}
]


app.get('/api/movies', (req, res) => {
    res.send(movies); //will return all the movies name
})


app.get('/api/movies/:id', (req, res) => {

    const mov = movies.find(m => m.movieId === parseInt(req.params.id)); //willcheck if movieId is exist
    if(!mov) return res.status(404).send('Movie does not exist!'); //if it deosnt exist then it will give 404 not found

    res.send(mov);
    
})

app.post('/api/movies/new', (req, res) => {
    
    const { error } = validateMovies(req.body); //will check the json object is in right syntax
    if(error) return res.status(400).send(error.details[0].message) //if no then 400 bad request

    const result2 = {                       // it will push this new movie name into the array
       movieId: movies.length + 1,
       movieName: req.body.movieName
    };

    movies.push(result2);           //push the data into array
    res.send(result2);              // in response gives the added movie
})

app.put('/api/movies/:id', (req, res) => {

    const mov1 = movies.find(m => m.movieId == parseInt(req.params.id)); //willcheck if movieId is exist
    if(!mov1) return res.status(404).send('Movie does not exist!');//if it deosnt exist then it will give 404 not found

    const { error } = validateMovies(req.body); //will check the json object is in right syntax
    if(error) return res.status(400).send(error.details[0].message); //if no then 400 bad request


    mov1.movieName = req.body.movieName //updates the movie name 
    res.send(mov1)   // in response gives the updated movie name
})


app.delete('/api/movies/:id', (req, res) => {
    const mov = movies.find(m => m.movieId === parseInt(req.params.id));//willcheck if movieId is exist
    if(!mov) return res.status(404).send('Movie does not exist!');//if it deosnt exist then it will give 404 not found


    const index = movies.indexOf(mov); //find the index of node to be deleted
    movies.splice(index, 1); //delete the node

    res.send(mov);
})

function validateMovies(mov) {

    const schema = {
        movieName: Joi.string().min(3).required()
    }

    return Joi.validate(mov, schema)

    
}; 

