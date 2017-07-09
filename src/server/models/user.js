'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
