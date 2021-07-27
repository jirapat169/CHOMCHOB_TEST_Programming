import DB from "./database";
import Crypto from "../models/crypto";
import User from "./../models/user";

const Migration = async () => {
  return DB.sequelize.sync({ force: true });
};

const Seeds = () =>
  new Promise(async (res, rej) => {
    try {
      await Migration();
      await Crypto.create({ name: "BTC", rate_to_btc: 1 });
      await Crypto.create({ name: "ETH", rate_to_btc: 0.05 });
      await User.create({
        username: "user1",
        prename: "นาย",
        firstname: "สวัสดี1",
        lastname: "สวีดัส1",
      });
      await User.create({
        username: "user2",
        prename: "นาย",
        firstname: "สวัสดี2",
        lastname: "สวีดัส2",
      });
      res("success");
    } catch (error) {
      rej(error);
    }
  });

export default Seeds;
