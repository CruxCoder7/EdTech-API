module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("student", {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
  });
  return Student;
};
