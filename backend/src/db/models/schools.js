const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const schools = sequelize.define(
    'schools',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  schools.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.schools.hasMany(db.users, {
      as: 'users_school',
      foreignKey: {
        name: 'schoolId',
      },
      constraints: false,
    });

    db.schools.hasMany(db.notifications, {
      as: 'notifications_school',
      foreignKey: {
        name: 'schoolId',
      },
      constraints: false,
    });

    db.schools.hasMany(db.schedules, {
      as: 'schedules_school',
      foreignKey: {
        name: 'schoolId',
      },
      constraints: false,
    });

    db.schools.hasMany(db.syllabuses, {
      as: 'syllabuses_school',
      foreignKey: {
        name: 'schoolId',
      },
      constraints: false,
    });

    //end loop

    db.schools.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.schools.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return schools;
};
