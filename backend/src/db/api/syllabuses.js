const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SyllabusesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const syllabuses = await db.syllabuses.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await syllabuses.setStudent(data.student || null, {
      transaction,
    });

    await syllabuses.setSchool(data.school || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.syllabuses.getTableName(),
        belongsToColumn: 'document',
        belongsToId: syllabuses.id,
      },
      data.document,
      options,
    );

    return syllabuses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const syllabusesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const syllabuses = await db.syllabuses.bulkCreate(syllabusesData, {
      transaction,
    });

    // For each item created, replace relation files

    for (let i = 0; i < syllabuses.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.syllabuses.getTableName(),
          belongsToColumn: 'document',
          belongsToId: syllabuses[i].id,
        },
        data[i].document,
        options,
      );
    }

    return syllabuses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const syllabuses = await db.syllabuses.findByPk(id, {}, { transaction });

    await syllabuses.update(
      {
        title: data.title || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await syllabuses.setStudent(data.student || null, {
      transaction,
    });

    await syllabuses.setSchool(data.school || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.syllabuses.getTableName(),
        belongsToColumn: 'document',
        belongsToId: syllabuses.id,
      },
      data.document,
      options,
    );

    return syllabuses;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const syllabuses = await db.syllabuses.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of syllabuses) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of syllabuses) {
        await record.destroy({ transaction });
      }
    });

    return syllabuses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const syllabuses = await db.syllabuses.findByPk(id, options);

    await syllabuses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await syllabuses.destroy({
      transaction,
    });

    return syllabuses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const syllabuses = await db.syllabuses.findOne({ where }, { transaction });

    if (!syllabuses) {
      return syllabuses;
    }

    const output = syllabuses.get({ plain: true });

    output.document = await syllabuses.getDocument({
      transaction,
    });

    output.student = await syllabuses.getStudent({
      transaction,
    });

    output.school = await syllabuses.getSchool({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'student',
      },

      {
        model: db.schools,
        as: 'school',
      },

      {
        model: db.file,
        as: 'document',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('syllabuses', 'title', filter.title),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.student) {
        const listItems = filter.student.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          studentId: { [Op.or]: listItems },
        };
      }

      if (filter.school) {
        const listItems = filter.school.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          schoolId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.syllabuses.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.syllabuses.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('syllabuses', 'title', query),
        ],
      };
    }

    const records = await db.syllabuses.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
