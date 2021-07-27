import { Op } from "sequelize";
import Models from "../../../models";

const User = Models.User;
const UserController = {};

UserController.findOne = (req, res) => {
  const { username } = req.body;
  User.findAll({
    where: {
      username1: {
        [Op.eq]: username,
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

UserController.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

UserController.create = (req, res) => {};

UserController.update = (req, res) => {};

UserController.delete = (req, res) => {};

UserController.deleteAll = (req, res) => {};

export default UserController;
