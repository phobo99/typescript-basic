'use strict';
import {
    DataTypes,
    Model
} from 'sequelize';

interface AllcodeAttributes {
    keyMap: string,
    type: string,
    valueEn: string,
    valueVi: string,
}

module.exports = (sequelize: any, dataTypes: typeof DataTypes) => {
    class Allcode extends Model<AllcodeAttributes>
        implements AllcodeAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        keyMap!: string;
        type!: string;
        valueEn!: string;
        valueVi!: string;
        static associate(models: any) {
            // define association here: Định danh các mối quan hệ
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
        }
    }
    Allcode.init({
        keyMap: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.STRING,
            allowNull: true
        },
        valueEn: {
            type: dataTypes.STRING,
            allowNull: true
        },
        valueVi: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};