/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const mongoose = require("mongoose");
const validator = require("validator");

const getFullDate = () => {
    console.log(new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate());
    return (
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate()
    );
};

/*----------------------------------------------------------------
Mongoose Schema
/*----------------------------------------------------------------*/
// TODO: fix validator of phone numbers
const OrderSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        message: "Name is required",
        validate: {
            validator: (val) => {
                validator.isAlpha(val);
            },
        },
    },
    last_name: {
        type: String,
        required: true,
        message: "Last name is required",
        validate: {
            validator: (val) => {
                validator.isAlpha(val);
            },
        },
    },
    phone: {
        type: String,
        required: true,
        message: "Phone is required",
        validate: {
            validator: (val) => {
                validator.isMobilePhone(val);
            },
        },
    },
    // TODO: check address
    address: {
        type: String,
        required: true,
        message: "Address is required",
    },
    // price: {
    //     type: Number,
    //     required: true,
    //     message: "Price is required",
    //     validate: {
    //         validator: (val) => {
    //             validator.isCurrency(val);
    //         },
    //     },
    quantity: {
        type: String,
        required: true,
        message: "Quantity is required",
        validate: {
            validator: (val) => {
                validator.isInt(val, { min: 1, max: 99 });
            },
        },
    },
    comments: { type: String },
    dish_name: {
        type: String,
        required: true,
        message: "Dish name is required",
        validate: {
            validator: (val) => {
                validator.isAlpha(val);
            },
        },
    },
    date: {
        // TODO: decide on string/ date format
        type: Date,
        default: getFullDate(),
        // required: true,
    },
});
module.exports = mongoose.model("OrderSchema", OrderSchema);