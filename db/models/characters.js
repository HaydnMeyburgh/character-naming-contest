"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    static associate(models) {
      Characters.belongsTo(models.Character_Images);
      Characters.belongsTo(models.Users);
    }
  }
  Characters.init(
    {
      character_names: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Characters",
    }
  );
  return Characters;
};
