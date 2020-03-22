const { Router } = require('express'); 
const router = Router(); 

const { getCustomer } = require('../../controllers/app/customer/customer');
router.get('/customer', getCustomer);

module.exports = router; 