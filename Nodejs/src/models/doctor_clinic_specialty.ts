'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface DoctorClinicSpecialtyAttributes {
  id: number;
  doctorId: number;
  clinicId: string;
  specialtyId: string;
}
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Doctor_Clinic_Specialty
    extends Model<DoctorClinicSpecialtyAttributes>
    implements DoctorClinicSpecialtyAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    doctorId!: number;
    clinicId!: string;
    specialtyId!: string;

    static associate(models: any) {
      // define association here: Định danh các mối quan hệ
    }
  }
  Doctor_Clinic_Specialty.init(
    {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      doctorId: {
        type: dataTypes.INTEGER,
      },
      clinicId: {
        type: dataTypes.INTEGER,
      },
      specialtyId: {
        type: dataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Doctor_Clinic_Specialty',
    },
  );
  return Doctor_Clinic_Specialty;
};
