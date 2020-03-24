//consulta albums
const getAlbum = async (req, res) => {
  try{
    
    const name = req.params.name;

    if (name){
      const response = await pool.query('SELECT * FROM Album WHERE UPPER(Title) like \'%' + name.toUpperCase() + '%\'' );
      res.json(response.rows);
    }else {
      const response = await pool.query('SELECT * FROM Album ' );
      res.json(response.rows);
    }
    
  }catch(e){
    console.log(e);
  }
}

const getAlbumByArtist = async (req, res) => {
  try{
    
    const artistId = req.params.artistId;
    const name = req.params.name;

    if (name){
      const response = await pool.query('SELECT * FROM Album WHERE ArtistId =' + artistId + ' AND UPPER(title) like \'%' + name.toUpperCase() + '%\'' );
      res.json(response.rows);
    }else {
      const response = await pool.query('SELECT * FROM Album WHERE ArtistId =' + artistId );
      res.json(response.rows);
    }
    
  }catch(e){
    console.log(e);
  }
}

//agrega una Album o actualiza si existe, y retorna la tupla cuando agrega.
const setAlbum = async (req, res) => {
  try{
    const { albumId, name, artistId } = req.body; 

    if (albumId){
      const update = await pool.query('UPDATE Album SET Title = $2 WHERE AlbumId = $1', [ albumId, name ] );
      res.send('ok');
    }else {
      const insert = await pool.query('INSERT INTO Album (Title, artistId) VALUES ($1, $2)', [name ,artistId] );
      const response = await pool.query('SELECT * FROM Album WHERE title = $1 and artistId= $2', [name, artistId]);
    
      res.json(response.rows);
    }
  }catch(e){
    console.log(e);
  }

}

//se elimina el Album
const delAlbum = async (req, res) => {
  try{
    const id = req.params.id; 
    const track = await pool.query('SELECT 1 FROM Track WHERE AlbumId = $1', [id]);
    
    if (track.rowCount != 0 && track.rows[0].login == 1) {
      throw 'No se puede eliminar, tiene albums asociados'
    }

    const response = await pool.query('DELETE FROM Album WHERE AlbumId = $1', [id]);
    res.send('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  getAlbum,
  getAlbumByArtist,
  setAlbum,
  delAlbum
}