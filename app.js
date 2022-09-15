const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
require("./db/mongoose");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

// const phonebookRoute = require("./routes/phonebook")
// app.use("/api", phonebookRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});