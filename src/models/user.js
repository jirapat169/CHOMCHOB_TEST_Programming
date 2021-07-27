import DB from "./../util/database";

const User = DB.sequelize.define(
  "user",
  {
    id: {
      type: DB.Sequelize.UUID,
      defaultValue: DB.Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      comment: "id",
    },
    username: {
      type: DB.Sequelize.STRING,
      allowNull: false,
      comment: "ชื่อผู้ใช้งาน",
    },
    prename: {
      type: DB.Sequelize.STRING,
      allowNull: false,
      comment: "คำนำหน้า",
    },
    firstname: {
      type: DB.Sequelize.STRING,
      allowNull: false,
      comment: "ชื่อ",
    },
    lastname: {
      type: DB.Sequelize.STRING,
      allowNull: false,
      comment: "สกุล",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["username"],
      },
    ],
  }
);

export default User;
