import { Op } from "sequelize";
import Models from "../../../models";
import { Serializer } from "jsonapi-serializer";

const Crypto = Models.Crypto;
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
