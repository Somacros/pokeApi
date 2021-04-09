var Pokedex = require('pokedex-promise-v2');

const { POKEMON_OFFICIAL_DRAW_URL, POKEMON_OFFICIAL_DRAW_URL_LESS10, POKEMON_OFFICIAL_DRAW_URL_LESS100, PNG_FORMAT } = require('../constants/constants')

var P = new Pokedex();

const addDrawings = ( pokedex, offset ) => {
    return new Promise(async( resolve, reject ) => {
        
        try {
            
            pokedex.forEach((pokemon, index, array) => {
                pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

                let pokemonNumber = (index + offset + 1)

                if (index + offset < 9) {
                    return pokemon.draw = POKEMON_OFFICIAL_DRAW_URL_LESS10 + (pokemonNumber) + PNG_FORMAT  
                } else if (index + offset < 99) {
                    return pokemon.draw = POKEMON_OFFICIAL_DRAW_URL_LESS100 + (pokemonNumber) + PNG_FORMAT
                } else {
                    return pokemon.draw = POKEMON_OFFICIAL_DRAW_URL + (pokemonNumber) + PNG_FORMAT
                }
                
            });
            
            resolve(pokedex);
        } catch (error) {
            console.log(`ERROR AL BUSCAR SPRITES :: ${error}`);
            reject(error);
        }

        
    })
}

const addTypes = ( pokedex ) => {
    return new Promise( async( resolve, reject ) => {

        const pokedexWithTypes =  pokedex.map( async( pokemon, index ) => {
            const pokemonData = await P.getPokemonByName(pokemon.name);
            const { types, ...rest } = pokemonData
    
            pokemon.types = types;
    
            return pokemon
        })

        resolve(pokedexWithTypes);

    });
}

module.exports = {
    addDrawings,
    addTypes
}