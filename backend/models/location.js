module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Location.associate = (models) => {
    Location.hasMany(models.Event, { foreignKey: 'location_id' });
  };

  return Location;
};