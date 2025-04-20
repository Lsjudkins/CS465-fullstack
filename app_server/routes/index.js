var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

/* GET dive sites page. */
router.get('/dives', ctrlMain.dives);  

module.exports = router;

