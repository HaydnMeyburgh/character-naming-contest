"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Characters.init(
    {
      id: DataTypes.INTEGER,
      character_names: DataTypes.STRING,
      photo_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "characters",
    }
  );
  return Characters;
};
