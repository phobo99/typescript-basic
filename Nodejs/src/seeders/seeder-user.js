'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [
    {
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Luu',
      lastName: 'Pho',
      address: 'HN',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
