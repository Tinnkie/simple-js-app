let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonListElement = $('.pokemon-list');

  let searchButton = $('.btn-warning');
  searchButton.on('click', function() {
    let pokemonListElement = $('.pokemon-list');
    pokemonListElement.empty();
    getByName($('.form-control').val()).forEach(function(pokemon) {
      addListItem(pokemon);
    });
  })

    // Push Pokemon to array
    function add (pokemon){
      pokemonList.push (pokemon);
    };

    function getAll (){
        return pokemonList;
    }

    // Adds a button with Pokemon name and creates event listener for details
    function addListItem (pokemon){
      let listItem = $('<li class="group-list-item"></li>');
      let button =$('<button class="pokemon-button btn btn-info" data-target="#pokemonModal" data-toggle="modal">' + pokemon.name + '</button>');

      listItem.append (button);
      pokemonListElement.append (listItem);

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
        item.types = details.types.map((type) => type.type.name);
      }).catch(function (e) {
        console.error(e);
      });
    }

    function getByName(search) {
      return pokemonList.filter(function(pokemon) {
        return pokemon.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    
    function showDetails (pokemon) {
      loadDetails(pokemon).then(function() {
        showModalDetails(pokemon);
      });
    }


    function showModalDetails(pokemon) {
      let modalTitle = $('.modal-title');
      let modalBody = $('.modal-body');

      modalTitle.text(pokemon.name);
      modalBody.empty();

      let height = $('<p>' + 'Height:  ' + pokemon.height + '</p>');
      let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
      let types = $('<p>' + 'Types:  ' + pokemon.types + '</p>');

      modalBody.append(image);
      modalBody.append(height);
      modalBody.append(types);
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        getByName: getByName,
        showDetails: showDetails,
        showModalDetails: showModalDetails
    };
}) ();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



