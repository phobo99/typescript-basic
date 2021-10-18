'use strict';

import {
    DataTypes,
    Model, Sequelize
} from 'sequelize';

interface ProjectAttributes {
    id: number;
    title: string;
    status: string;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class Project extends Model<ProjectAttributes>
        implements ProjectAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        id!: number;
        title!: string;
        status!: string;

        static associate(models: any) {
            // define association here
            Project.belongsToMany(models.User, {
                through: 'ProjectAssignments'
            })
        }
    };
    Project.init({
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};