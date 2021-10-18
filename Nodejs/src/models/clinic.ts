'use strict';
import {
    DataTypes,
    Model,
    Sequelize
} from 'sequelize';

interface ClinicAttributes {
    id: number;
    name: number;
    address: string;
    description: string;
    image: string;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class Clinic extends Model<ClinicAttributes>
        implements ClinicAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        name!: number;
        address!: string;
        description!: string;
        image!: string;

        static associate(models: any) {
            // define association here: Định danh các mối quan hệ
        }
    }
    Clinic.init({
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING,
        },
        address: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.TEXT,
        },
        image: {
            type: dataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};