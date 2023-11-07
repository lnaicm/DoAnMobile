
const userModel = require("../models/UserModel");

const UserModelMethods = {
    getUser: async (email) => {
        try {
            const user = await userModel.findOne({email: email}).exec();
            return user;
        } catch (error) {
            console.error("getUser Error: ", error);
            return null;
        }
    },

    createUser: async (userData) => {
        try {
            const user = new userModel(userData);
            await user.save();
            return user;
        } catch (error) {
            console.error("createUser Error: ", error);
            return false;
        }
    },

    updateUser: async (email, updateData) => {
        try {
            const user = await userModel.findOneAndUpdate({email: email}, updateData, {new: true});
            return user;
        } catch (error) {
            console.error("updateUser Error: ", error);
            return false;
        }
    },

    updateRefreshToken: async (email, refreshToken) => {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { email: email },
                { refreshToken: refreshToken },
                { new: true }
            ).exec();
            return updatedUser;
        } catch (error) {
            console.error("updateRefreshToken Error: ", error);
            return false;
        }
    }
};

module.exports = UserModelMethods;
