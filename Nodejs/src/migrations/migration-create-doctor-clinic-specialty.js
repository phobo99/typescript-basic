'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('doctor_clinic-specialty', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    doctorId: {
      type: Sequelize.INTEGER,
    },
    clinicId: {
      type: Sequelize.INTEGER,
    },
    specialtyId: {
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable('doctor_clinic-specialty');
}
