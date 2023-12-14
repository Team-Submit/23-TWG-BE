const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dot = require("dotenv");
const sequelize = require("./models").sequelize;

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "*",
  method: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  Credential: true,
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.set("jwt-secret", process.env.JWT);

app.listen(port, () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Success linking Database");
    })
    .catch((err) => {
      console.error(err);
    });

  console.log(`Listening on port ${port}!`);
});
