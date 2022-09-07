//Const and Let to grab items from DOM//

const pokeHouse = document.getElementById('pokeMons');
const pokeNumber = 20;

let listOfPokemon = {
  count: 0,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
  previous: 'https://pokeapi.co/api/v2/pokemon/?offset=1150&limit=20',
  results: [],
};

// Code to fetch API from poke.api using async function//
const pokeFetch = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const pokeMons = await response.json();
  console.log(url);
  createpokeMonsCard(pokeMons);
};

const fetchPokemons = async () => {
  for (let i = 1; i <= pokeNumber; i++) {
    await pokeFetch(i);
  }
};

/* 2 variabler for å hente neste sett av Pokemon. */

async function fetchNewSetOfPokemon() {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  );
  const nextSetOfPokemon = await response.json();
  return nextSetOfPokemon;
}

async function fetchPrevSetOfPokemon() {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=1150&limit=20'
  );
  const prevSetOfPokemon = await response.json();
  return prevSetOfPokemon;
}

/* 2. forsøk på å hente next og prev side av Pokemon */

// let pokeMonNext = async () => {
//   const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`;
//   const response = await fetch(url);
//   const nextPokemon = await response.json();
//   listOfPokemon(nextPokemon);
// };

// let pokeMonPrev = async () => {
//   const url = `https://pokeapi.co/api/v2/pokemon/?offset=1150&limit=20`;
//   const response = await fetch(url);
//   const prevPokemon = await response.json();
//   listOfPokemon(prevPokemon);
//   console.log(listOfPokemon);
// };

/* Event-listener to move forward and back to new pokemon */

// async function nextListOfPokemon(action) {
//   const data = await pokeFetch(action);
//   /*oppdater poke next og prev */
//   pokeList = {
//     count: data.count,
//     next: data.next || 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
//     previous:
//       data.previous ||
//       'https://pokeapi.co/api/v2/pokemon/?offset=1150&limit=20',
//     results: listOfPokemon.results,
//   };
//   const listPokemonArray = await Promise.all(
//     data.results.map(
//       async (pokemon) => findBy(pokemon) || updateCache(pokemon)
//     ),
//     []
//   );
//   renderPokemonList(listPokemonArray);
// }

// const buttons = document.getElementById('carousel-actions');
// buttons.addEventListener('click', (e) => {
//   if (e.target.id === 'carousel-button-next')
//     listOfPokemon(pokeMonNext.next); //bruke heller variable next og prev//
//   else if (e.target.id === 'carousel-button-prev')
//     listOfPokemon(pokeMonPrev.previous);
//   listOfPokemon();
// });

/* Bruke funksjon lengre oppe for å få eventlistener til å repondere å klikk og få ut nytt sett. */

const nextSet = document
  .getElementById('carousel-button-next')
  .addEventListener('click', () => {
    console.log('btn -> is clicked');
    async function fetchNewSetOfPokemon() {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
      );
      const nextSetOfPokemon = await response.json();
      return nextSetOfPokemon;
    }
    fetchNewSetOfPokemon();
  });

const prevSet = document
  .getElementById('carousel-button-prev')
  .addEventListener('click', () => {
    console.log('btn <- is clicked');
    async function fetchNewSetOfPokemon() {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?offset=1150&limit=20'
      );
      const nextSetOfPokemon = await response.json();
      return nextSetOfPokemon;
    }
    fetchPrevSetOfPokemon();
  });

//The code to manipulate the HTML document and create elements for rendering pokemon//

const createpokeMonsCard = (pokeMons) => {
  const pokeMonEl = document.createElement('div');
  pokeMonEl.classList.add('pokeMons');
  const { id, name, sprites, types } = pokeMons;
  const type = types[0].type.name;
  const pokeMonsInnerHtml = `
   <div class='img-box'>
   <img src="${sprites.front_default}" alt="${name}"/>
   </div>
   <div class="pokeInfo">
   <span class="pokeNumber">${id}</span>
   <h3 class="pokeName">${name.toUpperCase()}</h3>
   <small class="pokeType">Type: <span>${type}</span></small>
   </div>
   `;
  pokeMonEl.innerHTML = pokeMonsInnerHtml;
  pokeHouse.appendChild(pokeMonEl);
};

fetchPokemons();
