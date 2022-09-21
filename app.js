/*----------------------------------------------------------------
Import
/*----------------------------------------------------------------*/
const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
require("./db/mongoose");
const orderRoute = require("./routes/order")


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));
app.use("/api", orderRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
/*----------------------------------------------------------------
Export
/*----------------------------------------------------------------*/
module.exports = app


//  TODO:
// send the .env password
// Remove all console.log
// check edge cases - test it
// HTTP error codes go over all res.status()