const Pokedex = require('pokedex-promise-v2');
const { typesColours } = require('../constants/constants')
const P = new Pokedex();

const getAllTypesWithColors = async(req, res) => {
    
    try{

        const {results, count, ...rest} = await P.getTypesList();
    
        console.log(`${ count } TYPES GOT SUCCESFUL`);

        results.forEach((type, index, array) => {
            if( index <= typesColours.length -1 ) {
                type.colours = typesColours[index].colours;
            } else {
                res.status(500).json({
                    error: "1",
                    msg:`There's no colours assigned for the type: ${ type.name }.`
                })
            }
        });
    
        res.json(results)

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAllTypesWithColors
}