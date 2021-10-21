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
    id!: number;
    doctorId!: number;
    clinicId!: string;
    specialtyId!: string;
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
