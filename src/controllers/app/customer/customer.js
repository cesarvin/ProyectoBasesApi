const { Pool } = require('pg');
const { config } = require('../../../src/db.json');
pool = new Pool(config); 

const getCustomer = async (req, res) => {
  const response = await pool.query('SELECT * FROM CUSTOMER');
  res.status(200).json(response.rows);
}

const setCostumer = 

module.exports = {
  getCustomer
}