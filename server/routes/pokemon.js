const { Router } = require('express');
const { getSimplePokedex, getPokemonsPaginated, getPokemonTypesByName,  } = require('../controllers/pokemon');
const { getAllTypesWithColors } = require('../controllers/types');

const router = Router();

router.get('/pokemon', getPokemonsPaginated);

router.get('/pokemon-types/',getPokemonTypesByName);

router.get('/types', getAllTypesWithColors);


module.exports = router;