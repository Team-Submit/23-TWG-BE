const express = require("express");
const router = express();

const controller = require("../controller/user");

router.post("/signup", controller.SignUp);

module.exports = router;
