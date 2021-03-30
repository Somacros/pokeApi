const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');
const { isValidRole, isRepeatedEmail, isIdExisting } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','This is not a MongoDB Valid ID').custom( isIdExisting ).isMongoId(),
    check('role').custom( isValidRole),
    validarCampos
] , usuariosPut);

router.post('/',[
    check('name', 'The name parameter is required').not().isEmpty(),
    check('password', 'Password must has at least 6 characters and it is required.').isLength({ min:6 }),
    check('role').custom( isValidRole ),
    check('email', 'The email parameter has not an email format').custom( isRepeatedEmail ).isEmail(),
    validarCampos 
],usuariosPost)

router.delete('/', usuariosDelete);

module.exports = router;