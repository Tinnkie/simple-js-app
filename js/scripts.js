// A list of 3 Pokemon objects
let pokemonList = [
    {name: 'Butterfree', height: 3.07, types:['bug', 'flying']},
    {name: 'Beedrill', height: 3.03, types:['bug', 'poison']},
    {name: 'Jigglypuff', height: 1.08, types:['fairy', 'normal']}
];

// A list of Pokémon appear on the web browser, highlighting Pokémons with height above 2.00
    for (let i=0; i<pokemonList.length; i++){
        if (pokemonList[i].height > 2.00){
            document.write('<p>' + pokemonList[i].name + ' (height ' + pokemonList[i].height +') - Wow, that\'s big! </p>');
        } else {
            document.write('<p>' + pokemonList[i].name + ' (height ' + pokemonList[i].height +') </p>');
        }
    }
