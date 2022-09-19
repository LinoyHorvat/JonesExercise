/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const Order = require("../models/Order");
const dayjs = require("dayjs");

/*----------------------------------------------------------------
Controllers Functions
/*----------------------------------------------------------------*/
/**
 * @function readDataFromCsvFileAndInitiate
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
        console.log(newOrder);
        await newOrder.save();
        res.status(200).send(newOrder);
    } catch (err) {
        res.status(400).send(err.message);
        throw "The order wasn't save, please check the details and try again";
        // TODO:check error message
    }
};

/**
 * @function getAllOrderFromLastDay
 * @return All the Order from the last day.
 */

const getAllOrderFromLastDay = async(req, res) => {
    // const startOfDayDate = dayjs().startOf("day").subtract(3, 'day').toDate(); 
    // const endOfDayDate = dayjs().endOf("day").subtract(3, 'day').toDate()
    const startOfDayDate = dayjs().startOf("day").toDate(); // set to 12:00 am today
    const endOfDayDate = dayjs().endOf("day").toDate(); // set to 23:59 pm today
    try {
        const allOrderFromLastDay = await Order.find({
            date: { $gte: startOfDayDate, $lt: endOfDayDate },
        });
        if (allOrderFromLastDay && !allOrderFromLastDay.length)
            return res.status(404).send("No orders found");
        // TODO: check error message! should it bre 404?

        // const allOrderFromLastDay = await Order.aggregate([{
        //     $match: {
        //         $expr: {
        //             $gt: [
        //                 "$date",
        //                 { $dateSubtract: { startDate: "$$NOW", unit: "day", amount: 1 } }
        //             ]
        //         }
        //     }
        // }])
        console.log(allOrderFromLastDay);
        res.status(200).send(allOrderFromLastDay);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    getAllOrderFromLastDay,
    SaveNewOrder,
};