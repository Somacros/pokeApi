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
        try {
            var pokedexWithTypes = [];
            for (const pokemon of pokedex) {
                const pokemonData = await P.getPokemonByName(pokemon.name.toLowerCase());
                const { types, ...rest } = pokemonData
        
                pokemon.types = types;
                pokedexWithTypes.push(pokemon);
            }
            resolve(pokedexWithTypes);
        } catch (error) {
            reject('Error en addTypes',error)
        }

    });
}

module.exports = {
    addDrawings,
    addTypes
}