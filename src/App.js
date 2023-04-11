import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChuckNorrisJokes = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const storedJokes = JSON.parse(localStorage.getItem('jokes'));
    if (storedJokes) {
      setJokes(storedJokes);
    }
  }, []);

  const categoryChange = (event) => {
    setSelectedCategory(event.target.value);
    fetchJoke(event.target.value);
  }

  const fetchJoke = async (category) => {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const response = await axios.get(url);
    const newJoke = response.data.value;
    setJokes([...jokes, newJoke]);
    localStorage.setItem('jokes', JSON.stringify([...jokes, newJoke]));
  }

  const deleteJoke = (index) => {
    const newJokes = [...jokes];
    newJokes.splice(index, 1);
    setJokes(newJokes);
    localStorage.setItem('jokes', JSON.stringify(newJokes));
  }

  return (
    <div>
      <select value={selectedCategory} onChange={categoryChange}>
        <option value="">Escoge una categoría</option>
        {["animal", "career", "celebrity", "science", "food", "sport", "dev", "money", "explicit", "history", "fashion", "music", "movie", "political", "religion", "travel"].map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {jokes.map((joke, index) => (
        <div key={index} className="joke">
          <p>{joke}</p>
          <button onClick={() => deleteJoke(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ChuckNorrisJokes;