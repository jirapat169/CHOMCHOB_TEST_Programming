import { Op } from "sequelize";
import Models from "../../../models";
import { Serializer } from "jsonapi-serializer";

const Wallet = Models.Wallet;
const User = Models.User;
const WalletController = {};

WalletController.findAll = (req, res) => {
  User.findAll({ include: [Wallet] })
    .then((data) => {
      const jsonapi = new Serializer("user", {
        id: "username",
        attributes: [
          "username",
          "name",
          "email",
          "role",
          "createdAt",
          "updatedAt",
          "Wallets",
        ],
        Wallets: {
          ref: "id",
          included: true,
          attributes: [
            "username",
            "crypto_name",
            "amount",
            "createdAt",
            "updatedAt",
          ],
        },
      }).serialize(data);

      res.status(200).send(jsonapi);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

WalletController.findByUsername = (req, res) => {
  const { username } = req.params;
  Wallet.findAll({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
    include: [User],
  })
    .then((data) => {
      const jsonapi = new Serializer("wallets", {
        id: "id",
        attributes: [
          "username",
          "crypto_name",
          "amount",
          "createdAt",
          "updatedAt",
          "User",
        ],
        User: {
          ref: "username",
          included: true,
          attributes: [
            "username",
            "name",
            "email",
            "role",
            "createdAt",
            "updatedAt",
          ],
        },
      }).serialize(data);

      res.status(200).send(jsonapi);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

WalletController.create = (req, res) => {};

WalletController.update = (req, res) => {};

WalletController.delete = (req, res) => {};

WalletController.deleteAll = (req, res) => {};

export default WalletController;
