'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('histories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    patientId: {
      type: Sequelize.INTEGER,
    },
    doctorId: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT,
    },
    files: {
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable('histories');
}
