module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
    },
    password: DataTypes.STRING,
  });

  return User;
};
