'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';

interface HistoryAttributes {
  id: number;
  patientId: number;
  doctorId: string;
  description: string;
  files: string;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class History extends Model<HistoryAttributes> implements HistoryAttributes {
    id!: number;
    patientId!: number;
    doctorId!: string;
    description!: string;
    files!: string;
  }
  History.init(
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: dataTypes.INTEGER,
      },
      doctorId: {
        type: dataTypes.INTEGER,
      },
      description: {
        type: dataTypes.TEXT,
      },
      files: {
        type: dataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'History',
    },
  );
  return History;
};
