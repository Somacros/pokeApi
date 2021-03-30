const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const existeRol = await Role.findOne({ role });

    if( !existeRol ) {
        throw new Error(`The role '${ role }' is not registered in DataBase`)
    }
}

const isRepeatedEmail = async( email = '' ) => {

    const emailExists = await User.findOne({ email });

    if ( emailExists ) {
        throw new Error( `The email '${ email }' it's already registered in DataBase. Please try with a new email.` );
    }

}

const isIdExisting = async( _id = '' ) => {

    const idExists = await User.findOne({ _id });

    if ( !idExists ) {
        throw new Error( `The ID '${ _id }' doesn't exists in the DataBase. Please try with a valid ID.` );
    }

}

module.exports = {
    isValidRole,
    isRepeatedEmail,
    isIdExisting
}