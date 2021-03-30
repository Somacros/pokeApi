const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usuariosGet = async(req,res) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    const [ totalUsers, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        totalUsers,
        users
    });
}

const usuariosPut = async(req,res) => {

    const id = req.params.id;
    const { _id,password, google, ...user } = req.body;

    //TODO Validate to database

    if (password) {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await User.findByIdAndUpdate( id, user );

    res.json({
        msg: 'put API - Controlador',
        usuario
    })
}

const usuariosPost = async(req,res) => {


    

    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    user.save()
        .then( savedDoc => {
            if(savedDoc === user)
                console.log(`Usuario ${ user.email } registrado exitosamente`);
            else
                console.log('Usuario incorrecto, faltan parámetros');
        }).catch( err => {
            console.log(`Error al momento de intentar guardar el usuario :: ${ err }`);
        } )

    res.json({
        user
    })
}

const usuariosDelete = (req,res) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}