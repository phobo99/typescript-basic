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
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    patientId!: number;
    doctorId!: string;
    description!: string;
    files!: string;

    static associate(models: any) {
      // define association here: Định danh các mối quan hệ
    }
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
