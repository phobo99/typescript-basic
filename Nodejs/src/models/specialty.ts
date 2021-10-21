'use strict';
import { DataTypes, Model, Sequelize } from 'sequelize';

interface SpecialtyAttributes {
  id: number;
  name: string;
  image: string;
  description: string;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Specialty
    extends Model<SpecialtyAttributes>
    implements SpecialtyAttributes
  {
    id!: number;
    name!: string;
    image!: string;
    description!: string;
  }
  Specialty.init(
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
      },
      image: {
        type: dataTypes.STRING,
      },
      description: {
        type: dataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Specialty',
    },
  );
  return Specialty;
};
