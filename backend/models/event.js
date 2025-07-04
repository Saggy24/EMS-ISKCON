module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id',
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    deleted_at: {  // Change to match your database column
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
    Event.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Event.hasMany(models.Registration, { foreignKey: 'event_id', onDelete: 'CASCADE' });
  };

  return Event;
};