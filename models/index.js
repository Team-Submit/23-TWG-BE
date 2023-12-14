const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize({ ...config, sync: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Bookmark = require("./bookmark")(sequelize, Sequelize);

db.User.hasMany(db.Post, { foreignKey: "userID", sourceKey: "userID" });
db.Post.belongsTo(db.User, { foreignKey: "userID", targetKey: "userID" });

db.User.hasMany(db.Bookmark, { foreignKey: "userID", sourceKey: "userID" });
db.Bookmark.belongsTo(db.User, {
  foreignKey: "userID",
  targetKey: "userID",
});

module.exports = db;
