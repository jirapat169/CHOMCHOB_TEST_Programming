import { Op } from "sequelize";
import Models from "../../../models";
import { Serializer } from "jsonapi-serializer";

const User = Models.User;
const UserController = {};

UserController.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      const UserSerializer = new Serializer("users", {
        id: "username",
        attributes: [
          "username",
          "name",
          "email",
          "role",
          "createdAt",
          "updatedAt",
        ],
      });

      res.status(200).send(UserSerializer.serialize(data));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

UserController.findByUsername = (req, res) => {
  const { username } = req.params;

  User.findAll({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
  })
    .then((data) => {
      const UserSerializer = new Serializer("users", {
        id: "username",
        attributes: [
          "username",
          "name",
          "email",
          "role",
          "createdAt",
          "updatedAt",
        ],
      });

      res.status(200).send(UserSerializer.serialize(data));
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
