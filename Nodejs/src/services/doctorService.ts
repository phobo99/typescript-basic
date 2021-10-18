import db from "../models/index";

type DetailDoctor = {
    doctorId: number;
    contentHTML: string;
    contentMarkdown: string;
    action: string;
    description: string;
}

const getTopDoctorHome = async () => {
    try {
        const users = await db.User.findAll({
            where: { roleId: 'R2' },
            order: [['createdAt', 'DESC']],
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
            ],
            raw: true,
            nest: true
        })
        return ({
            errCode: 0,
            data: users
        })
    } catch (e) {
        console.log(e)
    }
}

const getAllDoctors = async () => {
    try {
        const doctors = await db.User.findAll({
            where: { roleId: 'R2' },
            attributes: {
                exclude: ['password', 'image']
            },
        })
        return ({
            errCode: 0,
            data: doctors
        })
    } catch (e) {
        console.log(e)
    }
}

const saveDetailInforDoctor = async (inputData: DetailDoctor) => {
    try {
        if (!inputData.doctorId || !inputData.contentHTML
            || !inputData.contentMarkdown || !inputData.action) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter'
            })
        } else {
            if (inputData.action === 'CREATE') {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId
                })
            } else if (inputData.action === 'EDIT') {
                let doctorMarkdown = await db.Markdown.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false
                })
                if (doctorMarkdown) {
                    doctorMarkdown.contentHTML = inputData.contentHTML;
                    doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                    doctorMarkdown.description = inputData.description;
                    doctorMarkdown.updateAt = new Date();
                    await doctorMarkdown.save()
                }
            }
            return ({
                errCode: 0,
                errMessage: 'Save info doctor succeed'
            })
        }
    } catch (e) {
        console.log(e)
    }
}

const getDetailDoctorById = async (inputId: string) => {
    try {
        if (!inputId) {
            return ({
                errCode: 1,
                errMessage: 'Missing required parameter!'
            })
        } else {
            let data = await db.User.findOne({
                where: { id: inputId },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.Markdown,
                        attributes: ['description', 'contentHTML', 'contentMarkdown']
                    },
                    {
                        model: db.Allcode,
                        as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    },
                ],
                raw: false,
                nest: true
            })
            if (data && data.image) {
                data.image = new Buffer(data.image, 'base64').toString('binary')
            }
            if (!data) data = {};
            return ({
                errCode: 0,
                data: data
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export default {
    getTopDoctorHome,
    getAllDoctors,
    saveDetailInforDoctor,
    getDetailDoctorById
}