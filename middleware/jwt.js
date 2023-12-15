const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  console.log(req.headers);
  const accessToken = req.headers.authorization;
  const secretKey = process.env.ACCESS_SECRET;

  try {
    if (!accessToken) {
      req.decoded = { id: null };
      next();
    } else {
      return jwt.verify(
        accessToken.split("Bearer ")[1],
        secretKey,
        async (err, decoded) => {
          req.decoded = decoded;
          next();
        }
      );
    }
  } catch (err) {
    return res.status(400).json({
      message: "에러가 발생했습니다.",
    });
  }
};

module.exports = tokenVerify;
