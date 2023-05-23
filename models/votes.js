"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Users, {foreignKey: "userId"});
      Votes.belongsTo(models.Characters, {foreignKey: "nameId"})
    }
  }
  Votes.init(
    {
      userId: DataTypes.INTEGER,
      nameId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Votes",
    }
  );
  return Votes;
};
