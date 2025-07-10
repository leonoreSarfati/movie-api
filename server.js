import { movies } from './data/movies.js';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;


// GET /movies — tous les films (avec option ?genre=)
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    return res.json(movies.filter(m => m.genre.toLowerCase() === genre.toLowerCase()));
  }
  res.json(movies);
});

// GET /movies/:id — film par ID
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Film non trouvé' });
  res.json(movie);
});

// GET /genres — liste unique des genres
app.get('/genres', (req, res) => {
  const genres = [...new Set(movies.map(m => m.genre))];
  res.json(genres);
});

// GET /directors — liste des réalisateurs
app.get('/directors', (req, res) => {
  const directors = [...new Set(movies.map(m => m.director))];
  res.json(directors);
});

// GET /movies/by-director/:name — films par réalisateur
app.get('/movies/by-director/:name', (req, res) => {
  const director = req.params.name.toLowerCase();
  const filtered = movies.filter(m => m.director.toLowerCase() === director);
  res.json(filtered);
});

// GET /top-rated — films triés par note décroissante
app.get('/top-rated', (req, res) => {
  const sorted = [...movies].sort((a, b) => b.rating - a.rating);
  res.json(sorted);
});

// GET /search?title=... — recherche simple
app.get('/search', (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Paramètre 'title' requis" });
  const results = movies.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
  res.json(results);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
