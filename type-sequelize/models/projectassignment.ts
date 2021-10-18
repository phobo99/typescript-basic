'use strict';

import {
    DataTypes,
    Model, Sequelize
} from 'sequelize';

interface ProjectAssignmentAttributes {
    ProjectId: number;
    UserId: string;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class ProjectAssignment extends Model<ProjectAssignmentAttributes>
        implements ProjectAssignmentAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        ProjectId!: number;
        UserId!: string;

        static associate(models: any) {
            // define association here
        }
    };
    ProjectAssignment.init({
        ProjectId: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Projects',
                key: "id"
            }
        },
        UserId: {
            type: dataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Users",
                key: "id"
            }
        }

    }, {
        sequelize,
        modelName: 'ProjectAssignment',
    });
    return ProjectAssignment;
};