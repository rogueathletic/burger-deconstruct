
module.exports = (sequelize, DataTypes) => {
  var Burger = sequelize.define('Burger', {
    Burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  }, {});
  Burger.associate = function(models) {
    // associations can be defined here
  };
  return Burger;
};