const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        // Check if the Authorization header exists in the request
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: "Authorization header missing",
                success: false,
            });
        }

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: "Auth failed",
                    success: false,
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Auth error`,
        });
    }
};

module.exports = protect;
