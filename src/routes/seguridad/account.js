const { Router } = require('express'); 
const router = Router(); 

const { getLogin } = require('../../controllers/seguridad/account');

//consulta
router.put('/login', getLogin);

//exporta las rutas
module.exports = router; 