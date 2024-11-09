const db = require('../models');
const Users = db.users;

const Notifications = db.notifications;

const Schedules = db.schedules;

const Syllabuses = db.syllabuses;

const Schools = db.schools;

const NotificationsData = [
  {
    message: 'Your Calculus 101 exam is in 3 days.',

    send_date: new Date('2023-10-28T09:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'Physics 201 assignment due tomorrow.',

    send_date: new Date('2023-10-29T09:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    message: 'New syllabus uploaded for Chemistry 301.',

    send_date: new Date('2023-10-25T09:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const SchedulesData = [
  {
    name: 'Midterm Exam Prep',

    start_date: new Date('2023-11-01T09:00:00Z'),

    end_date: new Date('2023-11-15T17:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Final Exam Prep',

    start_date: new Date('2023-12-01T09:00:00Z'),

    end_date: new Date('2023-12-15T17:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Weekly Study Plan',

    start_date: new Date('2023-10-01T09:00:00Z'),

    end_date: new Date('2023-10-07T17:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const SyllabusesData = [
  {
    title: 'Calculus 101',

    // type code here for "files" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Physics 201',

    // type code here for "files" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Chemistry 301',

    // type code here for "files" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const SchoolsData = [
  {
    name: 'Greenwood High School',
  },

  {
    name: 'Riverside College',
  },

  {
    name: 'Hilltop Academy',
  },
];

// Similar logic for "relation_many"

async function associateUserWithSchool() {
  const relatedSchool0 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setSchool) {
    await User0.setSchool(relatedSchool0);
  }

  const relatedSchool1 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setSchool) {
    await User1.setSchool(relatedSchool1);
  }

  const relatedSchool2 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setSchool) {
    await User2.setSchool(relatedSchool2);
  }
}

async function associateNotificationWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setUser) {
    await Notification0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setUser) {
    await Notification1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setUser) {
    await Notification2.setUser(relatedUser2);
  }
}

async function associateNotificationWithSchool() {
  const relatedSchool0 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Notification0 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Notification0?.setSchool) {
    await Notification0.setSchool(relatedSchool0);
  }

  const relatedSchool1 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Notification1 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Notification1?.setSchool) {
    await Notification1.setSchool(relatedSchool1);
  }

  const relatedSchool2 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Notification2 = await Notifications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Notification2?.setSchool) {
    await Notification2.setSchool(relatedSchool2);
  }
}

async function associateScheduleWithStudent() {
  const relatedStudent0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Schedule0 = await Schedules.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Schedule0?.setStudent) {
    await Schedule0.setStudent(relatedStudent0);
  }

  const relatedStudent1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Schedule1 = await Schedules.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Schedule1?.setStudent) {
    await Schedule1.setStudent(relatedStudent1);
  }

  const relatedStudent2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Schedule2 = await Schedules.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Schedule2?.setStudent) {
    await Schedule2.setStudent(relatedStudent2);
  }
}

async function associateScheduleWithSchool() {
  const relatedSchool0 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Schedule0 = await Schedules.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Schedule0?.setSchool) {
    await Schedule0.setSchool(relatedSchool0);
  }

  const relatedSchool1 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Schedule1 = await Schedules.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Schedule1?.setSchool) {
    await Schedule1.setSchool(relatedSchool1);
  }

  const relatedSchool2 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Schedule2 = await Schedules.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Schedule2?.setSchool) {
    await Schedule2.setSchool(relatedSchool2);
  }
}

async function associateSyllabusWithStudent() {
  const relatedStudent0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Syllabus0 = await Syllabuses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Syllabus0?.setStudent) {
    await Syllabus0.setStudent(relatedStudent0);
  }

  const relatedStudent1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Syllabus1 = await Syllabuses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Syllabus1?.setStudent) {
    await Syllabus1.setStudent(relatedStudent1);
  }

  const relatedStudent2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Syllabus2 = await Syllabuses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Syllabus2?.setStudent) {
    await Syllabus2.setStudent(relatedStudent2);
  }
}

async function associateSyllabusWithSchool() {
  const relatedSchool0 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Syllabus0 = await Syllabuses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Syllabus0?.setSchool) {
    await Syllabus0.setSchool(relatedSchool0);
  }

  const relatedSchool1 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Syllabus1 = await Syllabuses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Syllabus1?.setSchool) {
    await Syllabus1.setSchool(relatedSchool1);
  }

  const relatedSchool2 = await Schools.findOne({
    offset: Math.floor(Math.random() * (await Schools.count())),
  });
  const Syllabus2 = await Syllabuses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Syllabus2?.setSchool) {
    await Syllabus2.setSchool(relatedSchool2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Notifications.bulkCreate(NotificationsData);

    await Schedules.bulkCreate(SchedulesData);

    await Syllabuses.bulkCreate(SyllabusesData);

    await Schools.bulkCreate(SchoolsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithSchool(),

      await associateNotificationWithUser(),

      await associateNotificationWithSchool(),

      await associateScheduleWithStudent(),

      await associateScheduleWithSchool(),

      await associateSyllabusWithStudent(),

      await associateSyllabusWithSchool(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notifications', null, {});

    await queryInterface.bulkDelete('schedules', null, {});

    await queryInterface.bulkDelete('syllabuses', null, {});

    await queryInterface.bulkDelete('schools', null, {});
  },
};
