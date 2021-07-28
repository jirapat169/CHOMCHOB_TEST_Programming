import { Op } from "sequelize";
import Models from "../../../models";
import { Serializer } from "jsonapi-serializer";

const Wallet = Models.Wallet;
const User = Models.User;
const Crypto = Models.Crypto;
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

WalletController.transfer = async (req, res) => {
  const { username, crypto_name, amount, to_username, to_crypto_name } =
    req.body;

  try {
    //  exchange rate in
    const rate_in = await Crypto.findAll({
      where: {
        name: { [Op.eq]: `${crypto_name}`.toUpperCase() },
      },
    }).catch((reson) => {
      throw reson;
    });

    if (rate_in.length <= 0) {
      res.status(400).send({
        message: `Don\'t have ${crypto_name} in system`,
      });
      return;
    }

    //  exchange rate out
    const rate_out = await Crypto.findAll({
      where: {
        name: { [Op.eq]: `${to_crypto_name}`.toUpperCase() },
      },
    }).catch((reson) => {
      throw reson;
    });

    if (rate_out.length <= 0) {
      res.status(400).send({
        message: `Don\'t have ${to_crypto_name} in system`,
      });
      return;
    }

    const send_wallet = await Wallet.findAll({
      where: {
        username: {
          [Op.eq]: username,
        },
        crypto_name: { [Op.eq]: `${crypto_name}`.toUpperCase() },
      },
    }).catch((reson) => {
      throw reson;
    });

    if (send_wallet.length > 0) {
      if (send_wallet[0]["amount"] - amount >= 0) {
        let in_btc = amount * rate_in[0]["rate_to_btc"];
        let calc = in_btc / rate_out[0]["rate_to_btc"];

        const receive_wallet = await Wallet.findAll({
          where: {
            username: {
              [Op.eq]: to_username,
            },
            crypto_name: { [Op.eq]: `${to_crypto_name}`.toUpperCase() },
          },
        }).catch((reson) => {
          throw reson;
        });

        await Wallet.decrement("amount", {
          by: amount,
          where: { username: username, crypto_name: crypto_name },
        }).catch((reson) => {
          throw reson;
        });

        if (receive_wallet.length > 0) {
          await Wallet.increment("amount", {
            by: calc,
            where: { username: to_username, crypto_name: to_crypto_name },
          }).catch((reson) => {
            throw reson;
          });
        } else {
          await Wallet.create({
            username: to_username,
            crypto_name: to_crypto_name,
            amount: calc,
          }).catch((reson) => {
            throw reson;
          });
        }
        res.status(200).send({
          success: true,
        });
        return;
      } else {
        res.status(400).send({
          message: `balance is not enough in wallet`,
        });
        return;
      }
    } else {
      res.status(400).send({
        message: `${username} don\'t have ${crypto_name} in wallet`,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
    });
  }
};

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
