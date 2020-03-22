//Consulta las opciones de un rol
const getAction= async (req, res) => {
  try{
    
    const id = req.params.id; 
    
    const response = await pool.query('SELECT A.ActionId, O.name AS Option, AT.name AS ActionType \
                                        FROM "action" A \
                                          INNER JOIN "option"  O ON (A.OptionId = O.OptionId) \
                                          INNER JOIN actiontype AT ON (A.ActionTypeId = AT.ActionTypeId) \
                                        WHERE O.OptionId = $1', [id]);

    res.json(response.rows);
  }catch(e){
    console.log(e);
  }
}

//agrega una Rol, y retorna la tupla creada.
const setAction = async (req, res) => {
  try{

    const { actionId, optionId } = req.body; 
    
    //inserta
    const insert = await pool.query('INSERT INTO Action (actionId, optionId) VALUES ($1, $2)', [actionId, optionId] );
    
    //retorna ultimo valor insertado
    const response = await pool.query('SELECT A.ActionId, O.name AS Option, AT.name AS ActionType \
                                        FROM "action" A \
                                          INNER JOIN "option"  O ON (A.OptionId = O.OptionId) \
                                          INNER JOIN actiontype AT ON (A.ActionTypeId = AT.ActionTypeId) \
                                      WHERE A.actionId = $1 AND A.OptionId = $2', [ actionId, optionId]);
    res.json(response.rows);
    
  }catch(e){
    console.log(e);
  }

}

//se elimina el Rol
const delAction = async (req, res) => {
  try{
    const id = req.params.id; 
    const response = await pool.query('DELETE FROM action A WHERE A.ActionId = $1', [ id ]);
    res.send('Se elimino correctamente');

  }catch(e){
    console.log(e);
  }
}

module.exports = {
  getAction,
  setAction,
  delAction
}