/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URL;

require('dotenv').config();

mongoose.connect(mongo_uri, () => {
    console.log("connected to db");
})