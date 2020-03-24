const { Router } = require('express'); 
const router = Router(); 

const { getAlbum, setAlbum, delAlbum , getAlbumByArtist} = require('../../controllers/app/album');

//consulta
router.get('/album', getAlbum);
router.get('/album/:name', getAlbum);
router.get('/artist/album/:artistId', getAlbumByArtist);
router.get('/artist/album/:artistId/:name', getAlbumByArtist);

//ingresa
router.post('/album', setAlbum);

//elimina
router.delete('/album/:id', delAlbum);

//exporta las rutas
module.exports = router; 