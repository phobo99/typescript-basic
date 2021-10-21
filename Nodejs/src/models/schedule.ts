'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';

interface ScheduleAttributes {
  id: number;
  currentNumber: string;
  maxNumber: string;
  date: Date;
  timeType: string;
  doctorId: number;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Schedule
    extends Model<ScheduleAttributes>
    implements ScheduleAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    currentNumber!: string;
    maxNumber!: string;
    date!: Date;
    timeType!: string;
    doctorId!: number;
    static associate(models: any) {
      // define association here: Định danh các mối quan hệ
    }
  }
  Schedule.init(
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      currentNumber: {
        type: dataTypes.INTEGER,
      },
      maxNumber: {
        type: dataTypes.INTEGER,
      },
      date: {
        type: dataTypes.DATE,
      },
      timeType: {
        type: dataTypes.STRING,
      },
      doctorId: {
        type: dataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Schedule',
    },
  );
  return Schedule;
};
