import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importar React y axios, así como useState y useEffect, hooks proporcionados por React para manejar el estado y los efectos secundarios.

const ChuckNorrisJokes = () => {

// Crear un componente de función ChuckNorrisJokes.

const [selectedCategory, setSelectedCategory] = useState('');
const [jokes, setJokes] = useState([]);

// Usar useState hook para manejar el estado del componente. En este caso, almacenar el valor seleccionado por el usuario y las bromas recibidas de la API en un estado.

useEffect(() => {
const storedJokes = JSON.parse(localStorage.getItem('jokes'));
if (storedJokes) {
setJokes(storedJokes);
}
}, []);

// Usar useEffect hook para realizar efectos secundarios en el componente. En este caso, recuperar las bromas almacenadas en el almacenamiento local del navegador y actualizar el estado del componente.

const categoryChange = (event) => {
setSelectedCategory(event.target.value);
fetchJoke(event.target.value);
}

// Manejar el cambio de categoría de la broma seleccionada por el usuario, actualizando el estado del componente y llamando a la función fetchJoke.

const fetchJoke = async (category) => {
const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
const response = await axios.get(url);
const newJoke = response.data.value;
setJokes([...jokes, newJoke]);
localStorage.setItem('jokes', JSON.stringify([...jokes, newJoke]));
}

// Usar axios para realizar una solicitud a la API Chuck Norris Jokes y actualizar el estado del componente con la nueva broma recibida. También actualizar el almacenamiento local con la nueva broma.

const deleteJoke = (index) => {
const newJokes = [...jokes];
newJokes.splice(index, 1);
setJokes(newJokes);
localStorage.setItem('jokes', JSON.stringify(newJokes));
}

// Eliminar una broma de la lista de bromas, actualizar el estado del componente y actualizar el almacenamiento local.

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

// Renderizar el componente de Chuck Norris Jokes, mostrando la lista de bromas y permitiendo al usuario seleccionar una categoría y eliminar bromas.

export default ChuckNorrisJokes;

// Exportar el componente para su uso en otras partes de la aplicación.