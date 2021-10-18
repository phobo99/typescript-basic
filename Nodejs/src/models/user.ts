'use strict';
import {
    DataTypes,
    Model, Sequelize
} from 'sequelize';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phonenumber: string;
    gender: string;
    image: string;
    roleId: string;
    positionId: string;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class User extends Model<UserAttributes>
        implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        email!: string;
        password!: string;
        firstName!: string;
        lastName!: string;
        address!: string;
        phonenumber!: string;
        gender!: string;
        image!: string;
        roleId!: string;
        positionId!: string;

        static associate(models: any) {
            // define association here: Định danh các mối quan hệ
            User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
            User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
            User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
        }
    }
    User.init({
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING,
        },
        firstName: {
            type: dataTypes.STRING,
        },
        lastName: {
            type: dataTypes.STRING,
        },
        address: {
            type: dataTypes.STRING,
        },
        phonenumber: {
            type: dataTypes.STRING,
        },
        gender: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.STRING,
        },
        roleId: {
            type: dataTypes.STRING,
        },
        positionId: {
            type: dataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};