const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const movies = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Science Fiction',
    year: 2010,
  },
  {
    id: 2,
    title: 'Gladiator',
    genre: 'Action',
    year: 2000,
  },
  {
    id: 3,
    title: 'The Notebook',
    genre: 'Romance',
    year: 2004,
  }
];

app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    return res.json(movies.filter(m => m.genre.toLowerCase() === genre.toLowerCase()));
  }
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
