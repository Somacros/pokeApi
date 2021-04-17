const {response} = require('express');
var Pokedex = require('pokedex-promise-v2');

const { addDrawings } = require('../service/pokemonService')

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
        
        const spritesArray = await addDrawings(results, parsedOffset);
    
        console.log("Justo antes de regresar");
        res.json({
            spritesArray,
            next
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
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

const getPokemonTypesByName = async( req, res ) => {

    let { pokemon = 'bulbasaur', ...restQuery } = req.query;

    pokemon = pokemon.toLowerCase();

    try{
        const pokemonTypes = await P.getPokemonByName(pokemon)
        const { types, ...rest } = pokemonTypes;
    
        res.json(types)
    } catch( error ){
        console.log(error);
        res.status(404).json(error);
    }
   
    
}

module.exports = {
    getSimplePokedex,
    getPokemonsPaginated,
    getPokemonTypesByName
}