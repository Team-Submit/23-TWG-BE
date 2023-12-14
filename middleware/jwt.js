const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res) => {
  const accessToken = req.headers.authorization || req.query.token;
  const secretKey = process.env.secretKey;

  if (!accessToken) {
    return res.status(401).json({
      message: "로그인이 필요합니다.",
    });
  }

  try {
    return jwt.verify(accessToken.split("Bearer ")[1], secretKey);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "에러가 발생했습니다.",
    });
  }
};

module.exports = tokenVerify;
