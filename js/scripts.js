let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Push Pokemon to array
    function add (pokemon){
      if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
        pokemonList.push (pokemon);
      }
    }

    function getAll (){
        return pokemonList;
    }

    // Adds a button with Pokemon name and creates event listener for details
    function addListItem (pokemon){
      let pokemons = $('.pokemon-list');
      let listItem = $('<li class="group-list-item"></li>');
      let button =$('<button class="pokemon-button btn btn-info" data-target="#pokemonModal" data-toggle="modal">' + pokemon.name + '</button>');

      listItem.append (button);
      pokemons.append (listItem);

      button.on ('click', function () {
        showDetails (pokemon);
      });
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
        // Add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    
    function showDetails (pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
    }

    // Show Pokemon details in modal
    function showModal(pokemon) {
      let types = '';
      pokemon.types.forEach(function(type) {
        types += type.type.name + '';
      });
    }

    function showModalDetails(pokemon) {
      let modalTitle = $('.modal-title');
      let modalBody = $('modal-body');

      modalTitle.empty();
      modalBody.empty();

      modalTitle.append(pokemon.name);
      modalBody.append('<img class="modal-img" src="${pokemon.imageUrl}">');
      modalBody.append('<p>Height: ${pokemon.height}</p>');
      modalBody.append('<p>Types: ${types}</p>');
    }

    function loadAll() {
      loadList().then(function() {
        getAll().forEach(function(pokemon) {
          addListItem(pokemon);
        });
      });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        showModalDetails: showModalDetails,
        loadAll:loadAll
    };
}) ();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



