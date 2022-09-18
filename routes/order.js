const router = require('express').Router();

const { getAllOrderFromLastDay, SaveNewOrder } = require('../controllers/order')

module.exports = router;

router.get("/", getAllOrderFromLastDay)
router.post("/", SaveNewOrder)