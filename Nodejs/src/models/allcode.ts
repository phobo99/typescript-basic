'use strict';
import { DataTypes, Model } from 'sequelize';

interface AllCodeAttributes {
  keyMap: string;
  type: string;
  valueEn: string;
  valueVi: string;
}

module.exports = (sequelize: any, dataTypes: typeof DataTypes) => {
  class AllCode extends Model<AllCodeAttributes> implements AllCodeAttributes {
    keyMap!: string;
    type!: string;
    valueEn!: string;
    valueVi!: string;
    static associate(models: any) {
      AllCode.hasMany(models.User, {
        foreignKey: 'positionId',
        as: 'positionData',
      });
      AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
    }
  }
  AllCode.init(
    {
      keyMap: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.INTEGER,
      },
      type: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      valueEn: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      valueVi: {
        type: dataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'AllCode',
    },
  );
  return AllCode;
};
