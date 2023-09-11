const {
    response
} = require('express');
var Pokedex = require('pokedex-promise-v2');

const {
    createPokemonObjectsByNamesArray
} = require('../service/pokemonService');

const options = {
    protocol: 'http',
    cacheLimit: 1 * 1000, // 100s
    timeout: 5 * 1000 // 5s
}

var P = new Pokedex(options);

const getPokemonsPaginated = async (req, res) => {

    const {
        limit = 20, offset = 0
    } = req.query;

    const interval = {
        limit,
        offset
    }

    try {

        const parsedOffset = parseInt(offset);

        const pokedexPage = await P.getPokemonSpeciesList(interval)

        const {
            results,
            next,
            ...rest
        } = pokedexPage;

        let spritesArray = await createPokemonObjectsByNamesArray(results, parsedOffset);

        res.json({
            next,
            spritesArray,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            msg: error
        });
    }

}

const getSimplePokedex = async (req, res) => {

    try {

        const pokedex = await P.getPokemonsList();

        const {
            results,
            ...rest
        } = pokedex;

        const spritesArray = await addDrawings(results);

        res.json({
            spritesArray
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}

const getPokemonByName = async (req, res) => {

    const {
        name
    } = req.query;
    if (name && name.length >= 3) {
        try {
            const {
                results,
                ...rest
            } = await P.getPokemonSpeciesList();

            const filteredPokemon = results.filter(pokemon => {
                return pokemon.name.includes(name);
            });

            if (filteredPokemon.length) {
                const pokedexWithFormat = await createPokemonObjectsByNamesArray(filteredPokemon, 0);

                res.json({
                    spritesArray: pokedexWithFormat
                });
            } else {
                res.status(404).json('Pokemon Not Found while Filtering!');
            }


        } catch (error) {
            if (error.statusCode == 404) {
                res.status(404).json('Pokemon Not Found!');
            } else {
                res.status(500).json(error);
            }
            console.log('Error:', error);
        }
    } else {
        res.status(400).json('Please provide at least 3 characters.');
    }
}

module.exports = {
    getSimplePokedex,
    getPokemonsPaginated,
    getPokemonByName,
}