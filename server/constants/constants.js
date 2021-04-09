
const typesColours = [
    {
        name: "normal",
        colours:{ 
            primary: "#a4acaf",
            secondary: "#a4acaf",
            fontColor: "#212121"
        }
    },
    {
        name: "fighting",
        colours:{ 
            primary: "#d56723",
            secondary: "#d56723",
            fontColor: "#fff"
        }
    },
    {
        name: "flying",
        colours:{ 
            primary: "#3dc7ef",
            secondary: "#bdb9b8",
            fontColor: "#212121"
        }
    },
    {
        name: "poison",
        colours:{ 
            primary: "#b97fc9",
            secondary: "#b97fc9",
            fontColor: "#fff"
        }
    },
    {
        name: "ground",
        colours:{ 
            primary: "#f7de3f",
            secondary: "#ab9842",
            fontColor: "#212121"
        }
    },
    {
        name: "rock",
        colours:{ 
            primary: "#a38c21",
            secondary: "#a38c21",
            fontColor: "#fff"
        }
    },
    {
        name: "bug",
        colours:{ 
            primary: "#729f3f",
            secondary: "#729f3f",
            fontColor: "#fff"
        }
    },
    {
        name: "ghost",
        colours:{ 
            primary: "#7b62a3",
            secondary: "#7b62a3",
            fontColor: "#fff"
        }
    },
    {
        name: "steel",
        colours:{ 
            primary: "#9eb7b8",
            secondary: "#9eb7b8",
            fontColor: "#212121"
        }
    },
    {
        name: "fire",
        colours:{ 
            primary: "#fd7d24",
            secondary: "#fd7d24",
            fontColor: "#fff"
        }
    },
    {
        name: "water",
        colours:{ 
            primary: "#4592c4",
            secondary: "#4592c4",
            fontColor: "#fff"
        }
    },
    {
        name: "grass",
        colours:{ 
            primary: "#9bcc50",
            secondary: "#9bcc50",
            fontColor: "#212121"
        }
    },
    {
        name: "electric",
        colours:{ 
            primary: "#eed535",
            secondary: "#eed535",
            fontColor: "#212121"
        }
    },
    {
        name: "psychic",
        colours:{ 
            primary: "#f366b9",
            secondary: "#f366b9",
            fontColor: "#fff"
        }
    },
    {
        name: "ice",
        colours:{ 
            primary: "#51c4e7",
            secondary: "#51c4e7",
            fontColor: "#212121"
        }
    },
    {
        name: "dragon",
        colours:{ 
            primary: "#53a4cf",
            secondary: "#f16e57",
            fontColor: "#fff"
        }
    },
    {
        name: "dark",
        colours:{ 
            primary: "#707070",
            secondary: "#707070",
            fontColor: "#fff"
        }
    },
    {
        name: "fairy",
        colours:{ 
            primary: "#fdb9e9",
            secondary: "#fdb9e9",
            fontColor: "#212121"
        }
    },
    {
        name: "unknown",
        colours:{ 
            primary: "#fff",
            secondary: "#fff",
            fontColor: "#212121"
        }
    },
    {
        name: "shadow",
        colours:{ 
            primary: "#707070",
            secondary: "#707070",
            fontColor: "#fff"
        }
    }
]

const POKEMON_OFFICIAL_DRAW_URL_LESS10 = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/00"
const POKEMON_OFFICIAL_DRAW_URL_LESS100 = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/0"
const POKEMON_OFFICIAL_DRAW_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
const PNG_FORMAT = ".png"


module.exports = {
    typesColours,
    POKEMON_OFFICIAL_DRAW_URL,
    POKEMON_OFFICIAL_DRAW_URL_LESS10,
    POKEMON_OFFICIAL_DRAW_URL_LESS100,
    PNG_FORMAT
}