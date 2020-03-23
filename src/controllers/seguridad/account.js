//realiza el login
const getLogin = async (req, res) => {
  try{
    
    const user = req.body.user;
    const pass = req.body.pass; 
    var menu = {};
    
    const login = await pool.query('SELECT 1 AS Login \
                                       FROM account a \
                                       WHERE a.accountuser = $1 \
                                       AND a.password  =$2', [user, pass]);
    //console.log(login);
    if (login.rowCount != 0 && login.rows[0].login == 1){
      menu.login = 1;
      menu.menu = await pool.query('SELECT A.accountid,  \
                                        O.optionid,  \
                                        O.name, \
                                        O.ismenu, \
                                        O.url, \
                                        EXISTS (SELECT 1 \
                                            FROM Action A \
                                                INNER JOIN ActionType AT ON A.actiontypeid  = AT.actiontypeid  \
                                            WHERE AT.name = \'Seleccionar\' \
                                            AND A.optionid = O.optionid) AS Consultar, \
                                        EXISTS (SELECT 1 \
                                            FROM Action A \
                                                INNER JOIN ActionType AT ON A.actiontypeid  = AT.actiontypeid  \
                                            WHERE AT.name = \'Insertar\' \
                                            AND A.optionid = O.optionid) AS Insertar, \
                                        EXISTS (SELECT 1 \
                                            FROM Action A \
                                                INNER JOIN ActionType AT ON A.actiontypeid  = AT.actiontypeid  \
                                            WHERE AT.name = \'Actualizar\' \
                                            AND A.optionid = O.optionid) AS Actualizar, \
                                        EXISTS (SELECT 1 \
                                            FROM Action A \
                                                INNER JOIN ActionType AT ON A.actiontypeid  = AT.actiontypeid  \
                                            WHERE AT.name = \'Eliminar\' \
                                            AND A.optionid = O.optionid) AS Eliminar \
                                        FROM account A \
                                            INNER JOIN rolaccount RA ON A.accountid = RA.accountid  \
                                            INNER JOIN roloption RO ON RA.rolid = RO.rolid  \
                                            INNER JOIN Option O ON RO.optionid  = O.optionid  \
                                      WHERE A.accountid  = 1');
      
      
    } else {
      throw 'Usuario o contraseña incorrectos'
    }

    res.json(menu);

  }catch(e){
    console.log(e);
    res.status(400).json({login: 0});
  }
}


module.exports = {
  getLogin
}