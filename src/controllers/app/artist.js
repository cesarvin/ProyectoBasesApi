//consulta artistas
const getArtist = async (req, res) => {
  try{
    
    const name = req.params.name; 
    if (name){
      const response = await pool.query('SELECT * FROM Artist WHERE UPPER(Name) like \'%' + name.toUpperCase() + '%\'' );
      res.json(response.rows);
    }else {
      const response = await pool.query('SELECT * FROM Artist ' );
      res.json(response.rows);
    }
    
  }catch(e){
    console.log(e);
  }
}

//agrega una Artist o actualiza si existe, y retorna la tupla cuando agrega.
const setArtist = async (req, res) => {
  try{
    const { artistId, name } = req.body; 

    if (artistId){
      const update = await pool.query('UPDATE Artist SET Name = $2 WHERE ArtistId = $1', [ artistId, name ] );
      res.send('ok');
    }else {
      const insert = await pool.query('INSERT INTO Artist (Name) VALUES ($1)', [name] );
      const response = await pool.query('SELECT * FROM Artist WHERE name = $1', [name]);
    
      res.json(response.rows);
    }
  }catch(e){
    console.log(e);
  }

}

//se elimina el Artist
const delArtist = async (req, res) => {
  try{
    const id = req.params.id; 
    const album = await pool.query('SELECT 1 FROM Album WHERE ArtistId = $1', [id]);
    
    if (album.rowCount != 0 && album.rows[0].login == 1) {
      throw 'No se puede eliminar, tiene albums asociados'
    }

    const response = await pool.query('DELETE FROM Artist WHERE ArtistId = $1', [id]);
    res.send('Se elimino correctamente');
  
  }catch(e){
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  getArtist,
  setArtist,
  delArtist
}