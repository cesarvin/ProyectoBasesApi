const { Router } = require('express'); 
const router = Router(); 

const { getArtist, setArtist, delArtist } = require('../../controllers/app/artist');

//consulta
router.get('/artist', getArtist);
router.get('/artist/:name', getArtist);

//ingresa
router.post('/artist', setArtist);

//elimina
router.delete('/artist/:id', delArtist);

//exporta las rutas
module.exports = router; 