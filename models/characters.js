"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    static associate(models) {
      Characters.belongsTo(models.Character_Images, { foreignKey: "ImageId" });
      Characters.belongsTo(models.Users, { foreignKey: "UserId" });
      Characters.hasMany(models.Votes, {foreignKey: "nameId"})
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
