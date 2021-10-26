const express = require('express');
const movies = require('./movies.json')
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/movies?', (req, res) => {
  let result = movies.filter(movie => movie.title.includes(req.query.title))
  if (result.length === 0) {
    result = `Sorry could not find any movie titles containing: ${req.query.title}`;
    res.status(404);
  }
  //what would be a 400 status example
  res.send(result)
})

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  let result;

  result = movies.find(movie => movie.id == req.params.id)
  if (result == undefined) {
    result = "Sorry could not find movie id"
    res.status(404);
  }
  if (isNaN(parseInt(req.params.id))) {
    result = "That wasn't a number, try again."
    res.status(400);
  }
  res.send(result)
});

app.post('/movies', (req, res) => {
  let movie = req.body;
  let id = movies[movies.length - 1].id + 1;
  let title = movie.title;
  let runtime = movie.runtime;
  let release_year = movie.release_year;
  let director = movie.director;

  let newMovie = {
    id: id, title: title, runtime: runtime, release_year: release_year, director: director
  }

  movies.push(newMovie);
  res.json(newMovie).status(200)
});

app.delete('/movies/:id', (req, res) => {
  const result = movies.find(movie => movie.id == req.params.id)
  let index = movies.indexOf(result);
  movies.splice(index, 1);

  res.json(movies).status(204);
});



// /movies?title={titleQuery}
//Get /movies with additional :id param --done
//should have error handling 404: not found and 400 invalid ID supplied --done
//should have ?title=  query that will string match movies with error handling 400/404 --done
//these responses should have the following return {id, title, runtime, release_year, director} --done

//Post /movies should accept body with title, runtime, release_year, and director. (should also post with random id)
//only need 200 status code should return posted obj as response

//Delete /movies/{movieID}
//does not specify response --done

//Stretch goals: use cookies to set 2 cookies named firstName and lastName. Create a route/endpoint named setCookie that sets the cookies with your first name and last name.
//Create a route/endpoint named readCookie that displays your name on the browser using the cookies that were set.




app.listen(port, () => {
  console.log(`See the movies on port ${port}`);
});