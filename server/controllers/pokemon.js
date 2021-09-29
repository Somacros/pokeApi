const {response} = require('express');
var Pokedex = require('pokedex-promise-v2');

const { addDrawings, addTypes } = require('../service/pokemonService')

var P = new Pokedex();

const getPokemonsPaginated = async( req, res ) => {

    const { limit = 20, offset = 0 } = req.query;

    const interval = {
        limit,
        offset
    }

    try {

        const parsedOffset = parseInt(offset);
        
        const pokedexPage = await P.getPokemonSpeciesList(interval)
        
        const { results, next, ...rest } = pokedexPage;
        
        let pokemonDraws = await addDrawings(results, parsedOffset);
        let spritesArray = await addTypes(pokemonDraws);
        res.json({
            spritesArray,
            next
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, msg: error});
    }

}

const getSimplePokedex = async(req, res) => {

    try {
        
        const pokedex = await P.getPokemonList();
        
        const { results, ...rest } = pokedex;

        const spritesArray = await addDrawings(results);
    
        res.json({spritesArray})

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}

module.exports = {
    getSimplePokedex,
    getPokemonsPaginated
}