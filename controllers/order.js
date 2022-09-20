/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const Order = require("../models/Order");
const dayjs = require("dayjs");
/*----------------------------------------------------------------
Utile
/*----------------------------------------------------------------*/
/**
 * @function orderValidations
 * Get order details and check them.
 * @return True if the order is valid or False otherwise.
 */
const orderValidations = (order) => {
    // const {
    //     first_name,
    //     last_name,
    //     phone,
    //     address,
    //     quantity,
    //     comments,
    //     dish_name,
    // } = order;
    // if (!first_name || !last_name || !phone || !address || !quantity || !comments || !dish_name) {
    //     return false;
    // }
    return true;
};
/*----------------------------------------------------------------
    Controllers Functions
/*----------------------------------------------------------------*/
/**
 * @function SaveNewOrder
 * Save a new Order details into YammieOrder db.
 * @return The Details of the new order.
 */
const SaveNewOrder = async(req, res) => {
    const {
        first_name,
        last_name,
        phone,
        address,
        quantity,
        comments,
        dish_name,
    } = req.body;
    try {
        const newOrder = new Order({
            first_name,
            last_name,
            phone,
            address,
            quantity,
            comments,
            dish_name,
        });
        if (!orderValidations(newOrder)) {
            // TODO: write error message &http
            res.status(400).json({
                message: "Invalid order details, please fix and try again",
            });
        }
        console.log(newOrder);
        await newOrder.save();
        res.status(200).send(newOrder);
    } catch (err) {
        res.status(400).send(err.message);
        throw "The order wasn't save, please check the details and try again";
        // TODO:check error message
        // TODO: validation of req -> how to block new filed
    }
};

/**
 * @function getAllOrderFromLastDay
 * Get all the order from the last day.
 * @return All the Order from the last day.
 */
const getAllOrderFromLastDay = async(req, res) => {
    const startOfDayDate = dayjs().startOf("day").subtract(1, "day").toDate();
    const endOfDayDate = dayjs().endOf("day").subtract(1, "day").toDate();
    try {
        const allOrderFromLastDay = await Order.find({
            date: { $gte: startOfDayDate, $lt: endOfDayDate },
        });
        if (allOrderFromLastDay && !allOrderFromLastDay.length)
            return res.status(404).send("No orders found");
        // TODO: check error message! should it bre 404?
        // console.log(allOrderFromLastDay);
        // console.log(dayjs(startOfDayDate));
        // console.log(dayjs(endOfDayDate));
        // console.log("Mikey=", dayjs("2022-09-18T16:59:48.469Z"));
        res.status(200).send(allOrderFromLastDay);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
/**
 * @function getAllOrders
 * Get all orders.
 * @return All the Orders.
 */
const getAllOrders = async(req, res) => {
    try {
        const allOrders = await Order.find();
        // TODO: check error message! should it bre 404?
        if (allOrders && !allOrders.length)
            return res.status(404).send("No orders found");
        res.status(200).send(allOrders);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getAllOrderFromLastDay,
    SaveNewOrder,
    getAllOrders,
};