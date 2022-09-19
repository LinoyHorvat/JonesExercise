/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const router = require('express').Router();
const { getAllOrderFromLastDay, SaveNewOrder } = require('../controllers/order')

/*----------------------------------------------------------------
Routes Implementations
/*----------------------------------------------------------------*/
router.get("/", getAllOrderFromLastDay)
router.post("/", SaveNewOrder)

/*----------------------------------------------------------------
Export
/*----------------------------------------------------------------*/
module.exports = router;