import React, { useState } from 'react';
// Se importa axios para recoger datos de la API
import axios from 'axios';

// 
const ChuckNorrisJokes = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [joke, setJoke] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    fetchJoke(event.target.value);
  }

  const fetchJoke = async (category) => {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const response = await axios.get(url);
    setJoke(response.data.value);
  }

  const handleDeleteClick = () => {
    setJoke('');
  }

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Escoge una categoría</option>
        {["animal", "career", "celebrity", "science", "food", "sport", "dev", "money", "explicit", "history", "fashion", "music", "movie", "political", "religion", "travel"].map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      <div className="joke">
        <p>{joke}</p>
        <button onClick={handleDeleteClick}>Eliminar</button>
      </div>
    </div>
  );
}

export default ChuckNorrisJokes;
