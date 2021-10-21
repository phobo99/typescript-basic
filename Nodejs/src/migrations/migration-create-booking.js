'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('bookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    statusId: {
      type: Sequelize.STRING,
    },
    doctorId: {
      type: Sequelize.INTEGER,
    },
    patientId: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.DATE,
    },
    timeType: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('bookings');
}
