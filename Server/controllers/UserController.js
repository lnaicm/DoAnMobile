const randToken = require("rand-token");
const bcrypt = require("bcrypt");

const authMethods = require("../methods/AuthMethods");
const userModelMethods = require("../methods/UserModelMethods");
const UserModelMethods = require("../methods/UserModelMethods");

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
                moneySpent: 0
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
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        const user = await userModelMethods.getUser(email);
        if (!user) {
            console.log("Tai khoan khong ton tai!");
            return res.status(401).send("Tài khoản không tồn tại!");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            console.log("Mat khau khong chinh xac!");
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
            console.log("Dang nhap khong thanh cong!")
            return res.status(401).send("Đăng nhập không thành công!");
        }

        let refreshToken = randToken.generate(process.env.REFRESH_TOKEN_SIZE);
        if (!user.refreshToken) {
            await userModelMethods.updateRefreshToken(user.email, refreshToken);
        }
        else {
            refreshToken = user.refreshToken;
        }

        return res.json({
            //msg: "Đăng nhập thành công",
            accessToken,
            refreshToken,
            user
        });
    },

    logout: async(req, res) => {
        try {
            const userEmail = req.body.email;
            const updateResult = await UserModelMethods.updateRefreshToken(userEmail, null);
            if (updateResult) {
                res.status(200).json({message: "Đã đăng xuất"})
            }
            else {
                throw new Error("Không thể vô hiệu refresh token!");
            }
        } catch (error) {
            res.status(500).send("Lỗi đăng xuất!")
        }
    },

    refreshAccessToken: async (req, res) => {
        const accessTokenFromHeader = req.headers.x_authorization;
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
        if (!decoded) {
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
    },

    purChase: async (req, res) => {
        try {
            const userEmail = req.body.email; 
            const purchaseAmount = req.body.amount;

            if (!userEmail) {
                res.status(200).json({message: "Giao dịch ẩn danh thành công", purchaseAmount});
                return;
            }

            const user = await UserModelMethods.getUser(userEmail);
            if (user) {
                const newMoneySpent = user.moneySpent + purchaseAmount;
                const updateResult = await UserModelMethods.updateUser(userEmail, {moneySpent: newMoneySpent});
                
                if (updateResult) {
                    res.status(200).json({message: "Giao dịch thành công", newMoneySpent});
                }
                else {
                    throw new Error("Lỗi cập nhật giá trị giao dịch!")
                }
            }
            else {
                res.status(404).send("Không tìm thấy thông tin người dùng");
            }
        } catch (error) {
            res.status(500).send("Giao dịch thất bại!");
        }
    },

    changePassword: async (req, res) => {
        try {
            const userEmail = req.user.email.toLowerCase();
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            const user = await userModelMethods.getUser(userEmail);
            if (!user) {
                return res.status(404).send("Không tìm thấy người dùng");
            }

            const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).send("Mật khẩu cũ không chính xác");
            }

            const hashedNewPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUNDS, 10));
            const updateResult = await userModelMethods.updateUser(userEmail, { password: hashedNewPassword });

            if (updateResult) {
                // If you want to force the user to re-login after a password change, you can invalidate the current access token.
                // Invalidate access token by removing it from the client-side (e.g., logging out on the client side).
                
                // Alternatively, you can generate a new access token and send it back to the client.
                // const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
                // const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                // const dataForAccessToken = { email: user.email };
                // const newAccessToken = await authMethods.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);

                //return res.status(200).json({ message: "Đổi mật khẩu thành công", newAccessToken });
                return res.status(200).send("Đổi mật khẩu thành công");
            } else {
                throw new Error("Lỗi cập nhật mật khẩu");
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("Đổi mật khẩu thất bại");
        }
    },
};

module.exports = UserController;