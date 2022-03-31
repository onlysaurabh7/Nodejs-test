const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.db_Url;

mongoose.connect(
    dbURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, result) => {
        if (err) {
            console.log("Database Connection Error", err);
        } else {
            console.log("Database Connected");
        }
    }
);