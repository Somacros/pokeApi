const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8081;
        this.pokemonsPath = '/api';

        //Middlewares
        this.middleWares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middleWares(){

        //Directorio público
        this.app.use( express.static('public') );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //CORS
        this.app.use( cors() );

    }

    routes(){

        this.app.use(this.pokemonsPath, require('../routes/pokemon')); 
        this.app.use(this.pokemonsPath, require('../routes/news'));

    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Server running on port:', this.port);
        } )
    }
}

module.exports = Server;