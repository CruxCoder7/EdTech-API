module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    scopes: DataTypes.ARRAY(DataTypes.STRING),
  });

  return Role;
};
