import doctorService from '../services/doctorService';
import { Request, Response } from 'express';

const getTopDoctor = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorService.getTopDoctor();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      message: 'Error from server...',
    });
  }
};

const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

const saveInfoDoctor = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }
  try {
    const doctorInfo = await doctorService.saveDoctorInfo(req.body);
    return res.status(200).json(doctorInfo);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

const getDoctorById = async (req: Request, res: Response) => {
  if (!req.query.id) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing requied parameters',
    });
  }
  try {
    const detailDoctor = await doctorService.getDoctorById(
      req.query.id as string,
    );
    return res.status(200).json(detailDoctor);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: 'error from the server',
    });
  }
};

export default {
  getTopDoctor,
  getAllDoctors: getDoctors,
  saveInfoDoctor,
  getDoctorById,
};
