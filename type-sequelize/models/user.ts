'use strict';
import {
    Model, UUIDV4, Sequelize, DataTypes,
} from 'sequelize';

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class User extends Model<UserAttributes>
        implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: string;
        name!: string;
        email!: string;
        password!: string;

        static associate(models: any) {
            // define association here
            User.belongsToMany(models.Project, {
                through: 'ProjectAssignments'
            })
        }
    }
    User.init({
        id: {
            type: dataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};