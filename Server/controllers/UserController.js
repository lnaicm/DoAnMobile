const randToken = require("rand-token");
const bcrypt = require("bcrypt");

const authMethods = require("../methods/AuthMethods");
const userModelMethods = require("../methods/UserModelMethods");

const UserController = {
    register: async (req, res) => {
        const email = req.body.email.toLowerCase();
        const user = await userModelMethods.getUser(email);
        if (user) res.status(409).send("Email đã tồn tại!");
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS, 10));
            const newUser = {
                name: req.body.name,
                email: email,
                password: hashedPassword,
            };
            const createUser = await userModelMethods.createUser(newUser);
            if (!createUser) {
                return res.status(400).send("Có lỗi trong quá trình tạo tài khoản!");
            }
            return res.send({
                email,
            });
        }
    },

    login: async (req, res) => {
        const email = req.body.email.tolowerCase() || 'test';
        const password = req.body.password || '12345';

        const user = await userModelMethods.getUser(email);
        if (!user) {
            return res.status(401).send("Email không chính xác!");
        }
        const isPasswordValid = brypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Mật khẩu không chính xác!");
        }

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const dataForAccessToken = {
            email: user.email,
        }
        const accessToken = await authMethods.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return res.status(401).send("Đăng nhập không thành công!");
        }

        let refreshToken = randToken.generate(process.env.REFRESH_TOKEN_SIZE);
        if (!user.refreshToken) {
            await userModelMethods.updateRefreshToken(user.email, refreshToken);
        }

        return res.json({
            msg: "Đăng nhập thành công",
            accessToken,
            refreshToken,
            user
        });
    },

    refreshToken: async (req, res) => {
        const accessTokenFromHeader = req.header.x_authorization;
        if (!accessTokenFromHeader) {
            return res.status(400).send("Không tìm thấy access token!");
        }

        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return res.status(400).send("Không tìm thấy refresh token!");
        }

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

        const decoded = await authMethods.decodeToken(
            accessTokenFromHeader,
            accessTokenSecret
        );
        if (!decode) {
            return res.status(400).send("Access token không hợp lệ!");
        }

        const email = decoded.payload.email;

        const user = await userModelMethods.getUser(email);
        if (!user) {
            return res.status(401).send("Email không tồn tại!");
        }

        if (refreshTokenFromBody !== user.refreshToken) {
            return res.status(400).send("Refresh token không hợp lệ!");
        }

        const dataForAccessToken = {
            email
        };

        const accessToken = await authMethods.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife
        );
        if (!accessToken) {
            return res.status(400).send("Tạo access token không thành công!");
        }
        return res.json({
            accessToken
        });
    }
};

module.exports = UserController;