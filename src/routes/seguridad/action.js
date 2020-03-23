const { Router } = require('express'); 
const router = Router(); 

const { getAction, setAction, delAction } = require('../../controllers/seguridad/action');

//consulta
router.get('/action/:optionId', getAction);

//ingresa
router.post('/action', setAction);

//elimina
router.delete('/action/:optionId/:actionId', delAction);

//exporta las rutas
module.exports = router; 