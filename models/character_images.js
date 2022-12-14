"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Character_Images extends Model {
    static associate(models) {
      Character_Images.hasMany(models.Characters, {
        as: "character_names",
        foreignKey: "ImageId",
      });
    }
  }
  Character_Images.init(
    {
      name: DataTypes.STRING,
      image_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Character_Images",
    }
  );
  return Character_Images;
};
