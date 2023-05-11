module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "User",
    {
      id_mobil: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
