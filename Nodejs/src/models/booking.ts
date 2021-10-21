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
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    statusId!: string;
    doctorID!: number;
    patientId!: number;
    date!: Date;
    timeType!: string;
    static associate(models: any) {
      // define association here: Định danh các mối quan hệ
    }
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
