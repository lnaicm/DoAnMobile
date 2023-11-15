import AsyncStorage from "@react-native-async-storage/async-storage";

const UserController = {
    getUser: async () => {
        try {
            const userInfo = await AsyncStorage.getItem('user');
            return JSON.parse(userInfo);
        }
        catch (error) {
            console.error("Error getUserInfo: ", error);
            return null;
        }
    },

    storeUser: async (user) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }
        catch (error) {
            console.error("Error storeUserInfo: ", error);
        }
    },

    removeUser: async () => {
        try {
            await AsyncStorage.removeItem('user');
        }
        catch (error) {
            console.error("Error removeUserInfo: ", error);
        }
    },
};

export default UserController;