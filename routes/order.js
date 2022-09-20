/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const router = require("express").Router();
const {
    getAllOrderFromLastDay,
    SaveNewOrder,
    getAllOrders,
} = require("../controllers/order");

/*----------------------------------------------------------------
Routes Implementations
/*----------------------------------------------------------------*/
router.get("/lastDayOrders", getAllOrderFromLastDay);
router.get("/", getAllOrders);
router.post("/", SaveNewOrder);

/*----------------------------------------------------------------
Routes Implementations TODO: change this
/*----------------------------------------------------------------*/
router.use((req, res) => {
    res.status(404).json({ message: 'Path not found, only the following paths are supported: GET /, GET /lastDayOrders, POST /' });
});
/*----------------------------------------------------------------
Export
/*----------------------------------------------------------------*/
module.exports = router;