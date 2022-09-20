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
        await newOrder.save();
        res.status(200).send(newOrder);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/**
 * @function getAllOrderFromLastDay
 * Get all the order from the last day.
 * @return All the Order from the last day.
 */
const getAllOrderFromLastDay = async(req, res) => {
    // TODO: check edge cases
    const startOfDayDate = dayjs().startOf("day").subtract(1, "day").toDate();
    const endOfDayDate = dayjs().endOf("day").subtract(1, "day").toDate();
    try {
        const allOrderFromLastDay = await Order.find({
            date: { $gte: startOfDayDate, $lt: endOfDayDate },
        });
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