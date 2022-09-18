const Order = require("../models/Order");

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
        console.log(newOrder);
        await newOrder.save();
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const getAllOrderFromLastDay = async(req, res) => {
    try {
        const allOrderFromLastDay = await Order.find();
        console.log("getAllOrderFromLastDay");
        res.status(200).send(allOrderFromLastDay);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getAllOrderFromLastDay,
    SaveNewOrder,
};