"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - username
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          username:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, must be unique
 *          password:
 *            type: string
 *        example:
 *           firstName: user
 *           lastName: person
 *           username: Test User
 *           email: testuser@test.com
 *           password: pole1232
 */
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Characters, {
        as: "character_names",
        foreignKey: "UserId",
      });
      Users.hasMany(models.Votes, {
        foreignKey: "userId"
      })
    }
  }
  Users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
