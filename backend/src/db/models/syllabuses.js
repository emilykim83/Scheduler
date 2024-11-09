const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const syllabuses = sequelize.define(
    'syllabuses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
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

  syllabuses.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.syllabuses.belongsTo(db.users, {
      as: 'student',
      foreignKey: {
        name: 'studentId',
      },
      constraints: false,
    });

    db.syllabuses.belongsTo(db.schools, {
      as: 'school',
      foreignKey: {
        name: 'schoolId',
      },
      constraints: false,
    });

    db.syllabuses.hasMany(db.file, {
      as: 'document',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.syllabuses.getTableName(),
        belongsToColumn: 'document',
      },
    });

    db.syllabuses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.syllabuses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return syllabuses;
};
