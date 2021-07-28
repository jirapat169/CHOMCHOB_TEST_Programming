import { Op } from "sequelize";
import Models, { sequelize } from "../../../models";
import { Serializer } from "jsonapi-serializer";

const Crypto = Models.Crypto;
const Wallet = Models.Wallet;
const User = Models.User;

const CryptoController = {};

CryptoController.findAll = async (req, res) => {
  try {
    const data = await Crypto.findAll().catch((reason) => {
      throw reason;
    });

    const jsonapi = new Serializer("crypto", {
      id: "name",
      attributes: ["name", "rate_to_btc", "createdAt", "updatedAt"],
    }).serialize(data);

    res.status(200).send(jsonapi);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

CryptoController.findAllBalance = async (req, res) => {
  try {
    const data = await Wallet.findAll({
      attributes: [
        "crypto_name",
        [sequelize.fn("SUM", sequelize.col("amount")), "amount"],
      ],
      group: "Wallet.crypto_name",
    }).catch((reason) => {
      throw reason;
    });

    const jsonapi = new Serializer("all_balance", {
      id: "crypto_name",
      attributes: ["crypto_name", "amount"],
    }).serialize(data);

    res.status(200).send(jsonapi);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

CryptoController.findByName = async (req, res) => {
  const { name } = req.params;

  try {
    const data = await Crypto.findAll({
      where: {
        name: {
          [Op.eq]: `${name}`.toUpperCase(),
        },
      },
    }).catch((err) => {
      throw err;
    });

    const jsonapi = new Serializer("crypto", {
      id: "name",
      attributes: ["name", "rate_to_btc", "createdAt", "updatedAt"],
    }).serialize(data);

    res.status(200).send(jsonapi);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

CryptoController.create = async (req, res) => {
  const { name, rate_to_btc } = req.body;
  try {
    const data = await Crypto.create({
      name: name,
      rate_to_btc: rate_to_btc,
    }).catch((err) => {
      throw err;
    });

    const jsonapi = new Serializer("crypto", {
      id: "name",
      attributes: ["name", "rate_to_btc", "createdAt", "updatedAt"],
    }).serialize(data);

    res.status(200).send(jsonapi);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

CryptoController.updateRate = async (req, res) => {
  const { rate_to_btc } = req.body;
  const { name } = req.params;
  try {
    const data = await Crypto.update(
      { rate_to_btc: rate_to_btc },
      {
        where: {
          name: `${name}`.toUpperCase(),
        },
      }
    ).catch((err) => {
      throw err;
    });

    res.status(200).send({
      success: data == 1,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

CryptoController.delete = (req, res) => {};

CryptoController.deleteAll = (req, res) => {};

export default CryptoController;
