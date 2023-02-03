let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function add (pokemon){
        pokemonList.push (pokemon);
    }

    function getAll (){
        return pokemonList;
    }

    function addListItem (pokemon){
      let pokemons = document.querySelector ('.pokemon-list');
      let listItem = document.createElement ('li');
      let button = document.createElement ('button');
      button.innerText = pokemon.name;
      button.classList.add ('button-class');
      listItem.appendChild (button);
      pokemons.appendChild (listItem);
      button.addEventListener ('click', function (Event) {
        showDetails (pokemon);
      })
    }

    function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    })
    }

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
}) ();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


// UNUSED (old) CODE: A list of 3 Pokemon objects
// let pokemonList = [
//     {name: 'Butterfree', height: 3.07, types:['bug', 'flying']},
//     {name: 'Beedrill', height: 3.03, types:['bug', 'poison']},
//     {name: 'Jigglypuff', height: 1.08, types:['fairy', 'normal']}
// ];


// A list of Pokémon in forEach() function
// pokemonRepository.getAll().forEach (function (pokemon) {
//     if (pokemon.height > 2.00){
//         document.write (pokemon.name + ' (height ' + pokemon.height + ') - Wow, that\'s big!' + '<br>')
//     } else {
//         document.write (pokemon.name + ' (height ' + pokemon.height + ')' + '<br>')
//     }
// });


// OLD CODE
// A list of Pokémon appear on the web browser, highlighting Pokémons with height above 2.00
    // for (let i=0; i<pokemonList.length; i++){
    //     if (pokemonList[i].height > 2.00){
    //         document.write('<p>' + pokemonList[i].name + ' (height ' + pokemonList[i].height +') - Wow, that\'s big! </p>');
    //     } else {
    //         document.write('<p>' + pokemonList[i].name + ' (height ' + pokemonList[i].height +') </p>');
    //     }
    // }