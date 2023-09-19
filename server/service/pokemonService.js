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
                if (match) {
                    pokemonNumber = match[1]
                } else {
                    throw new Error('Error while trying to get pokemon number to retrieve its sprite');
                }

                pokemon.draw = getPokemonDrawing(pokemonNumber);

            });

            resolve(pokedex);
        } catch (error) {
            console.log(`ERROR AL BUSCAR SPRITES : ${error}`);
            reject(error);
        }


    })
};

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

const getAllPokemonInfo = async (pokemonName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await P.getPokemonSpeciesByName(pokemonName);

            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
};

const getPokemonEvolutionChain = async (pokemonEvolutionChainURL) => {
    return new Promise(async (resolve, reject) => {
        try {
            const match = pokemonEvolutionChainURL.match(/\/(\d+)\/$/);

            if (match.length) {
                const evolutionChainID = match[1];
                const evolutionData = await P.getEvolutionChainById(evolutionChainID);
                const evolutionChain = getEvolutionsArray(evolutionData.chain, evolutionData.chain.species).reverse();

                resolve(evolutionChain);
            }

        } catch (error) {
            console.log('ERROR:', error);
            reject(error);
        }
    });
};

const getFullPokemonInformation = async (pokemonName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const basicInfo = await getAllPokemonInfo(pokemonName);

            const pokemon_draw = getPokemonDrawing(basicInfo.id);

            const {
                evolution_chain,
                ...rest
            } = basicInfo;

            const evolutionChain = await getPokemonEvolutionChain(evolution_chain.url);

            const evolution_chain_final = Array.isArray(evolutionChain[0]) ? evolutionChain[0] : evolutionChain;

            const fullInfo = await P.getPokemonByName(pokemonName);

            const allInformation = Object.assign({}, basicInfo, fullInfo, {
                evolution_chain: evolution_chain_final,
                draw: pokemon_draw
            });

            resolve(allInformation);

        } catch (error) {
            reject(error);
        }
    })
};

const getEvolutionsArray = (chain, specieInfo) => {
    try {
        let evolutionChain = [];

        const evolvePokemonID = chain.species.url.match(/\/(\d+)\/$/)[1];
        const previousPokemonID = specieInfo.url.match(/\/(\d+)\/$/)[1];
        const evolvePokemonDrawing = getPokemonDrawing(evolvePokemonID);
        const previousPokemonDrawing = getPokemonDrawing(previousPokemonID);

        if (chain.evolves_to && !!chain.evolves_to.length) {
            const nextEvolution = getEvolutionsArray(chain.evolves_to[0], chain.species);

            evolutionChain.unshift(nextEvolution);

            if (chain.evolution_details && !!chain.evolution_details.length) {
                const copyChain = Object.assign({}, chain);
                delete copyChain.evolves_to;
                const middleEvolution = getEvolutionsArray(copyChain, specieInfo);

                evolutionChain.unshift(middleEvolution);
            }
        } else {
            return {
                evolve_name: chain.species.name.toUpperCase(),
                evolve_drawing: evolvePokemonDrawing,
                min_level: chain.evolution_details[0].min_level,
                previous_name: specieInfo.name.toUpperCase(),
                previous_drawing: previousPokemonDrawing,
            }
        }

        return evolutionChain;
    } catch (error) {
        throw new Error(error);
    }
};

const getPokemonDrawing = (pokemonNumber) => {
    if (pokemonNumber < 10) {
        return POKEMON_OFFICIAL_DRAW_URL_LESS10 + (pokemonNumber) + PNG_FORMAT
    } else if (pokemonNumber < 100) {
        return POKEMON_OFFICIAL_DRAW_URL_LESS100 + (pokemonNumber) + PNG_FORMAT
    } else {
        return POKEMON_OFFICIAL_DRAW_URL + (pokemonNumber) + PNG_FORMAT
    }
};

module.exports = {
    createPokemonObjectsByNamesArray,
    getPokemonEvolutionChain,
    getAllPokemonInfo,
    getFullPokemonInformation,
}