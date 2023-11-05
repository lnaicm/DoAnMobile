const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const Authmethods = {
    generateToken: async (payload, secretSignature, tokenLife) => {
        try {
            return await sign(
                {
                    payload,
                },
                secretSignature,
                {
                    algorithm: 'HS256',
                    expriresIn: tokenLife,
                },
            );
        } catch (error) {
            console.error("generateToken Error: ", error);
            return null;
        }
    },

    verifyToken: async (token, secretKey) => {
        try {
            return await verify(token, secretKey);
        } catch (error) {
            console.error("verifyToken Error: ", error);
            return null;
        }
    },

    decodeToken: async (token, secretKey) => {
        try {
            return await verify(token, secretKey, {
                ignoreExpiration: true,
            });
        } catch (error) {
            console.error("decodeToken Error: ", error);
            return null;
        }
    }
};

module.exports = Authmethods;