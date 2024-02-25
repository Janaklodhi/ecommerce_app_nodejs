"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments",
      });
    }
  }

  Post.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      ImageUrl: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  return Post;
};
