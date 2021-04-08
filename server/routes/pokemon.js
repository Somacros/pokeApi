const { Router } = require('express');
const { getSimplePokedex, getPokemonsPaginated,  } = require('../controllers/pokemon');
const { getAllTypesWithColors } = require('../controllers/types');

const router = Router();

router.get('/pokemon', getPokemonsPaginated);

router.get('/types', getAllTypesWithColors);


module.exports = router;