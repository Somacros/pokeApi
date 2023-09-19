const { Router } = require('express');
const { getSimplePokedex, getPokemonsPaginated, getPokemonByName, getPokemonEvolveChain, getAllPokemonInformation, getFullInformation  } = require('../controllers/pokemon');
const { getAllTypesWithColors } = require('../controllers/types');

const router = Router();

router.get('/pokemon', getPokemonsPaginated);

router.get('/types', getAllTypesWithColors);

router.get('/pokemon/search', getPokemonByName);

router.get('/evolution', getPokemonEvolveChain);

router.get('/pokemon/specific', getAllPokemonInformation);

router.get('/pokemon/full', getFullInformation);


module.exports = router;