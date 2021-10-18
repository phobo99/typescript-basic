'use strict';
import {
    DataTypes,
    Model, Sequelize
} from 'sequelize';

interface MarkdownAttributes {
    id: number;
    contentHTML: string;
    contentMarkdown: string;
    description: string;
    doctorId: number;
    specialtyId: string;
    clinicId: number;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class Markdown extends Model<MarkdownAttributes>
        implements MarkdownAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        id!: number;
        contentHTML!: string;
        contentMarkdown!: string;
        description!: string;
        doctorId!: number;
        specialtyId!: string;
        clinicId!: number;

        static associate(models: any) {
            // define association here: Định danh các mối quan hệ
            Markdown.belongsTo(models.User, { foreignKey: 'doctorId' })
        }
    }
    Markdown.init({
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        contentHTML: {
            type: dataTypes.TEXT({ length: 'long' }),
        },
        contentMarkdown: {
            type: dataTypes.TEXT({ length: 'long' }),
        },
        description: {
            type: dataTypes.TEXT({ length: 'long' }),
        },
        doctorId: {
            type: dataTypes.INTEGER,
        },
        specialtyId: {
            type: dataTypes.INTEGER,
        },
        clinicId: {
            type: dataTypes.INTEGER,
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Markdown',
    });
    return Markdown;
};