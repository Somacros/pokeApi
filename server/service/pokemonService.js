var Pokedex = require('pokedex-promise-v2');

const {
    POKEMON_OFFICIAL_DRAW_URL,
    POKEMON_OFFICIAL_DRAW_URL_LESS10,
    POKEMON_OFFICIAL_DRAW_URL_LESS100,
    PNG_FORMAT
} = require('../constants/constants')

var P = new Pokedex();

const addDrawings = (pokedex, offset) => {
    return new Promise(async (resolve, reject) => {
        let pokemonNumber = '';
        try {
            pokedex.forEach((pokemon, index, array) => {
                pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

                let match = pokemon.url.match(/\/(\d+)\/$/);
                if(match) {
                    pokemonNumber = match[1]
                } else {
                    throw new Error('Error while trying to get pokemon number to retrieve its sprite');
                }

                if (pokemonNumber < 10) {
                    return pokemon.draw = POKEMON_OFFICIAL_DRAW_URL_LESS10 + (pokemonNumber) + PNG_FORMAT
                } else if (pokemonNumber < 100) {
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

const createPokemonObjectsByNamesArray = (pokedex, offset) => {
    return new Promise(async (resolve, reject) => {
        try {
            var pokedexWithTypes = [];
            for (const pokemon of pokedex) {
                const formattedPokemonName = pokemon.name.toLowerCase();
                const pokemonData = await P.getPokemonByName(formattedPokemonName);

                const {
                    types,
                    ...rest
                } = pokemonData

                pokemon.types = types;
                pokedexWithTypes.push(pokemon);
            }

            const pokedexWithTypesAndDrawings = addDrawings(pokedexWithTypes, offset);

            resolve(pokedexWithTypesAndDrawings);
        } catch (error) {
            reject('Error en createPokemonObjectsByNamesArray:', error);
        }

    });
};

module.exports = {
    createPokemonObjectsByNamesArray
}