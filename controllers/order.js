/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const Order = require("../models/Order");
const dayjs = require("dayjs");
/*----------------------------------------------------------------
    Controllers Functions
/*----------------------------------------------------------------*/
/**
 * @function SaveNewOrder
 * Save new Order details into YammieOrder DB.
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
 * Get all the orders from the last day.
 * @return All the Orders from the last day.
 */
const getAllOrderFromLastDay = async(req, res) => {
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