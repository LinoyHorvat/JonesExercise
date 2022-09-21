/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const mongoose = require('mongoose');

require('dotenv').config();
const mongo_uri = process.env.MONGO_URL;

mongoose.connect(mongo_uri, () => {
    console.log("connected to db");
})