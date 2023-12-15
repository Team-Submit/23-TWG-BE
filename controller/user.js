const { User, Sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { use } = require("../router");

dotenv.config();
/** 회원가입 */
const SignUp = async (req, res) => {
  const { id, password, nickname } = req.body;
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
      profile: 1,
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

const SignIn = async (req, res) => {
  const { id, password } = req.body;

  try {
    const salt = process.env.SALT;
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        message: "존재하지 않는 아이디입니다.",
      });
    }

    if (user.password === hash) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          nickname: user.nickname,
        },
        process.env.ACCESS_SECRET
      );

      return res.status(200).json({
        message: "로그인이 완료되었습니다.",
        accessToken,
      });
    } else {
      return res.status(401).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "에러가 발생했습니다.",
    });
  }
};

const GetProfile = async (req, res) => {
  const { id } = req.decoded;

  try {
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        message: "존재하지 않는 아이디입니다.",
      });
    }

    return res.status(200).json({
      nickname: user.nickname,
      profile: user.profile,
    });
  } catch (err) {
    return res.status(400).json({
      message: "에러가 발생했습니다.",
    });
  }
};

module.exports = {
  SignUp,
  SignIn,
  GetProfile,
};
