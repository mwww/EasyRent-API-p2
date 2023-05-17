module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define(
    'appointment',
    {
      id_appointment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_mobil: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      pickup_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      return_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  Appointments.belongsTo(sequelize.models.users, {
    foreignKey: 'id_user',
    targetKey: 'id_user',
  })
  Appointments.belongsTo(sequelize.models.cars, {
    foreignKey: 'id_mobil',
    targetKey: 'id_mobil',
  })

  return Appointments
}
