import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <body>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Escoge una categoría</option>
          <option value="animal">Animal</option>
          <option value="career">Carrera</option>
          <option value="celebrity">Celebridad</option>
          <option value="dev">Dev</option>
          <option value="explicit">Explícito</option>
          <option value="fashion">Moda</option>
          <option value="food">Comida</option>
          <option value="history">Historia</option>
          <option value="money">Dinero</option>
          <option value="movie">Películas</option>
          <option value="music">Music</option>
          <option value="political">Política</option>
          <option value="religion">Religión</option>
          <option value="science">Ciencia</option>
          <option value="sport">Deporte</option>
          <option value="travel">Viajes</option>
        </select>
        <div>{joke}</div>
      </div>
    </body>
  );
}

export default ChuckNorrisJokes;