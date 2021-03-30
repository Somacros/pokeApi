const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //Conectar a Base de datos Mongo
        this.conectarDB();

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

        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Server running on port:', this.port);
        } )
    }
}

module.exports = Server;