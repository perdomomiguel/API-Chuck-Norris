import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect desde la biblioteca React
import axios from 'axios'; // Importa Axios para hacer solicitudes HTTP

const ChuckNorrisJokes = () => { // Define un componente de React llamado ChuckNorrisJokes
  const [selectedCategory, setSelectedCategory] = useState(''); // Define el estado "selectedCategory" y la función "setSelectedCategory" para manejar el valor de la categoría seleccionada
  const [jokes, setJokes] = useState([]); // Define el estado "jokes" y la función "setJokes" para manejar los chistes obtenidos de la API

  useEffect(() => { // Define un efecto que se ejecuta cuando el componente se monta
    const storedJokes = JSON.parse(localStorage.getItem('jokes')); // Obtiene los chistes almacenados en el objeto localStorage
    if (storedJokes) { // Si hay chistes almacenados
      setJokes(storedJokes); // Actualiza el estado "jokes" con los chistes almacenados
    }
  }, []);

  const categoryChange = (event) => { // Define una función que se ejecuta cuando el usuario cambia la categoría seleccionada
    setSelectedCategory(event.target.value); // Actualiza el estado "selectedCategory" con la categoría seleccionada
    fetchJoke(event.target.value); // Llama a la función "fetchJoke" para obtener un nuevo chiste
  }

  const fetchJoke = async (category) => { // Define una función asíncrona que obtiene un chiste de la API y lo almacena en el estado y en localStorage
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`; // Crea una URL con la categoría seleccionada para obtener un chiste aleatorio de Chuck Norris
    const response = await axios.get(url); // Hace una solicitud HTTP GET a la URL usando Axios
    const newJoke = response.data.value; // Obtiene el valor del chiste desde la respuesta de la API
    setJokes([...jokes, newJoke]); // Agrega el nuevo chiste al estado "jokes"
    localStorage.setItem('jokes', JSON.stringify([...jokes, newJoke])); // Almacena los chistes en localStorage
  }

  const deleteJoke = (index) => { // Define una función que se ejecuta cuando el usuario hace clic en el botón "Eliminar" para eliminar un chiste
    const newJokes = [...jokes]; // Crea una copia del estado "jokes"
    newJokes.splice(index, 1); // Elimina el chiste seleccionado del array de chistes
    setJokes(newJokes); // Actualiza el estado "jokes" con la copia actualizada del array de chistes
    localStorage.setItem('jokes', JSON.stringify(newJokes)); // Almacena los chistes actualizados en localStorage
  }

  return ( // Devuelve el contenido del componente
    <div>
      <select value={selectedCategory} onChange={categoryChange}> 
        <option value="">Escoge una categoría</option> 
        {["animal", "career", "celebrity", "science", "food", "sport", "dev", "money", "explicit", "history", "fashion", "travel"].map((category) => ( // Mapea cada categoría en un elemento de opción
          <option value={category} key={category}>{category}</option> // Asigna el valor y la etiqueta de la opción con el nombre de la categoría
        ))}
      </select>
    
      {jokes.length > 0 && ( // Si hay chistes almacenados, muestra la lista de chistes
        <ul>
          {jokes.map((joke, index) => ( // Mapea cada chiste en un elemento de lista con un botón de "Eliminar" para cada chiste
            <p class="joke" key={index}>
              {joke}
              <button onClick={() => deleteJoke(index)}>Eliminar</button>
            </p>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChuckNorrisJokes;