'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';

interface BookAttributes {
  id: number;
  statusId: string;
  doctorID: number;
  patientId: number;
  date: Date;
  timeType: string;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Booking extends Model<BookAttributes> implements BookAttributes {
    id!: number;
    statusId!: string;
    doctorID!: number;
    patientId!: number;
    date!: Date;
    timeType!: string;
  }
  Booking.init(
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      statusId: {
        type: dataTypes.STRING,
      },
      doctorID: {
        type: dataTypes.INTEGER,
      },
      patientId: {
        type: dataTypes.INTEGER,
      },
      date: {
        type: dataTypes.DATE,
      },
      timeType: {
        type: dataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    },
  );
  return Booking;
};
