import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokedex = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const promise = axios(url);

    promise.then((res) => {
      setPokemon(res.data.sprites.front_shiny);
    });
  });

  return (
    <div>
      <img src={pokemon} alt={name} />
      <h1>{name}</h1>
    </div>
  );
};

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Candidato a useCallback y una explicacion del porque

  return (
    <div>
      <input onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => handleSearch(searchTerm)}>Search</button>
    </div>
  );
};

function App() {
  const [pokes, setPokes] = useState([]);
  const [query, setQuery] = useState("");

  // Llamar PokeAPI
  useEffect(() => {
    if (query) {
      const promise = axios(`https://pokeapi.co/api/v2/type/${query}`);

      promise.then((res) => {
        setPokes(res.data.pokemon.slice(0, 10));
      });
    }
  }, [query]);

  useEffect(() => {
    console.log(pokes);
  }, [pokes]);

  const handleSearchPokemons = (value) => {
    setQuery(value);
  };

  const myArrOfPokemons = pokes.map((value) => (
    <Pokedex
      name={value.pokemon.name}
      url={value.pokemon.url}
      key={value.pokemon.name}
    />
  ));

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Search handleSearch={handleSearchPokemons} />
      {pokes.length > 0 && myArrOfPokemons}
    </div>
  );
}

export default App;