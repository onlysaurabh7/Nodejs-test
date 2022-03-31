const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
        age: {
            type: Number
        },
        gender:{
            type:String
        },
        phone: {
            type: Number,
            
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },

       

    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);