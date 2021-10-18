import doctorService from "../services/doctorService";
import { Request, Response } from "express";

const getTopDoctorHome = async (req: Request, res: Response) => {
    try {
        const response = await doctorService.getTopDoctorHome()
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }
}
const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
const postInforDoctor = async (req: Request, res: Response) => {
    try {
        const response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
const getDetailDoctorById = async (req: Request, res: Response) => {
    try {
        const info = await doctorService.getDetailDoctorById(req.query.id as string);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessage: 'error from the server'
        })
    }
}
export default {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById
}