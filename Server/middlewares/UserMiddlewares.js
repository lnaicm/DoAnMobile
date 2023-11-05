const userModelMethods = require("../methods/UserModelMethods");
const authMethods = require("../methods/AuthMethods");

const UserMiddlewares = {
    isAuth: async (req, res, next) => {
        const accessTokenFromHeader = req.headers.x_authorization;
        if (!accessTokenFromHeader) {
            return res.status(401).send("Không tìm thấy access token!");
        }

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const verified = await authMethods.verifyToken(
            accessTokenFromHeader,
            accessTokenSecret
        );
        if (!verified) {
            return res.status(401).send("Bạn không có quyền truy cập tính năng này!");
        }

        const user = await userModelMethods.getUser(verified.payload.email);
        req.user = user;

        return next();
    }
};

module.exports = UserMiddlewares;