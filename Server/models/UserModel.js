const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email address!")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    moneySpent: {
        type: Number,
        default: 0
    },
    refreshToken: {
        type: String
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
