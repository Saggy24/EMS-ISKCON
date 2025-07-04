module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('registered', 'cancelled'),
      defaultValue: 'registered',
      allowNull: false,
    },
  }, {
    tableName: 'event_registrations',
    timestamps: true,
    createdAt: 'registration_date',
    updatedAt: false,
  });

  Registration.associate = (models) => {
    Registration.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Registration.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
  };

  return Registration;
};