const { Router } = require('express');
const { getSimplePokedex, getPokemonsPaginated, getPokemonByName  } = require('../controllers/pokemon');
const { getAllTypesWithColors } = require('../controllers/types');

const router = Router();

router.get('/pokemon', getPokemonsPaginated);

router.get('/types', getAllTypesWithColors);

router.get('/pokemon/search', getPokemonByName);


module.exports = router;