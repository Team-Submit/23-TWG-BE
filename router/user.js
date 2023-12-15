const express = require("express");
const router = express();

const controller = require("../controller/user");
const jwtMiddleware = require("../middleware/jwt");

router.post("/signup", controller.SignUp);
router.post("/signin", controller.SignIn);
router.get("/getprofile", jwtMiddleware, controller.GetProfile);

module.exports = router;
