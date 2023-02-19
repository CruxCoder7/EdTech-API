module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define("school", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
  });
  return School;
};
