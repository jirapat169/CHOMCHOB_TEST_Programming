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
            "id",
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
          "id",
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
          typeForAttribute: function (attribute, user) {
            return "user";
          },
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

WalletController.update = async (req, res) => {
  const { username } = req.params;
  const { crypto_name, amount, type } = req.body;

  try {
    let balance = await Wallet.findAll({
      where: {
        username: {
          [Op.eq]: username,
        },
        crypto_name: {
          [Op.eq]: crypto_name,
        },
      },
    });

    if (balance.length > 0) {
      let query;
      if (type === "increase") {
        query = Wallet.increment("amount", {
          by: amount,
          where: { username: username, crypto_name: crypto_name },
        });
      } else if (type === "decrease") {
        if (balance[0]["amount"] - amount < 0) {
          res.status(400).send({
            message: "balance is not enough",
            data: balance,
          });
          return;
        }
        query = Wallet.decrement("amount", {
          by: amount,
          where: { username: username, crypto_name: crypto_name },
        });
      } else {
        res.status(500).send({
          message: `type for update is invaild.`,
        });
      }

      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    } else {
      res.status(400).send({
        message: `${username} don't have ${crypto_name}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

WalletController.delete = (req, res) => {};

WalletController.deleteAll = (req, res) => {};

export default WalletController;
