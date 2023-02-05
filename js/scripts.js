let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';


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
          console.log(pokemon);
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

    // Change function to open clicked Pokemon in Modal
    function showDetails (item) {
      pokemonRepository.loadDetails(item).then (function () {
        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';
  
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let sprite = document.createElement('img');
        sprite.classList.add ('sprite');
        sprite.src = item.imageUrl;

        // Add new modal content
        let closeButtonElement = document.createElement ('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener ('click', hideModal)

        let titleElement = document.createElement ('h1');
        titleElement.innerText =  (item.name);

        let contentElement = document.createElement ('p');

        let pokemonTypes = "";

            // for loop to iterate through the item.types object
            for (let i = 0; i < item.types.length; i++) {
                pokemonTypes += item.types[i].type.name;
                if (i < item.types.length - 1) {
                    pokemonTypes += ", ";
                }
            }

        // Add value of typeNames to the innertext property of contentElement
        contentElement.innerText =('Height: ' + item.height + '\n' +  '\n' + 'Types: ' + pokemonTypes);


        modal.appendChild (closeButtonElement);
        modal.appendChild (titleElement);
        modal.appendChild (contentElement);
        modalContainer.appendChild (modal);
        modal.appendChild (sprite);


        modalContainer.classList.add('is-visible');


    function hideModal (){
        modalContainer.classList.remove ('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          hideModal();
        }
      });

    // Closes the modal if the user clics directly on the overlay
    modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
    });

    document.querySelector ('button.button-class').addEventListener('click', () => {
        showDetails ('Modal Title', 'Modal Content');
    });

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


