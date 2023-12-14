const { User, Sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();
/** 회원가입 */
const SignUp = async (req, res) => {
  const { id, password, nickname, profile } = req.body;
  try {
    const salt = process.env.SALT;
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    const duplicateId = await User.findOne({
      where: { id },
    });
    if (duplicateId) {
      return res.status(409).json({
        message: "이미 존재하는 아이디입니다.",
      });
    }

    await User.create({
      id,
      password: hash,
      nickname,
      profile,
    });

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
    });
  } catch (err) {
    return res.status(400).json({
      message: "에러가 발생했습니다.",
    });
  }
};

const SignIn = async () => {};

module.exports = {
  SignUp,
  SignIn,
};
