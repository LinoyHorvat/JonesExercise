/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const mongoose = require("mongoose");
const validator = require("validator");
/*----------------------------------------------------------------
Mongoose Schema
/*----------------------------------------------------------------*/
const OrderSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        message: "Name is required",
        validate: {
            validator: (val) => {
                return validator.isAlpha(val);
            },
        },
    },
    last_name: {
        type: String,
        required: true,
        message: "Last name is required",
        validate: {
            validator: (val) => {
                return validator.isAlpha(val);
            },
        },
    },
    phone: {
        type: String,
        required: true,
        message: "Phone is required",
        validate: {
            validator: (val) => {
                return validator.isMobilePhone(val);
            },
        },
    },
    address: {
        type: String,
        required: true,
        message: "Address is required",
    },
    quantity: {
        type: Number,
        min: 1,
        max: 50,
        required: true,
        message: "Quantity is required",
    },
    comments: { type: String },
    dish_name: {
        type: String,
        required: true,
        message: "Dish name is required",
        validate: {
            validator: (val) => {
                return validator.isAlpha(val);
            },
        },
    },
    date: {
        type: Date,
        default: new Date(),
    },
});
module.exports = mongoose.model("OrderSchema", OrderSchema);