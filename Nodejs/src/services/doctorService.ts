import db from '../models/index';

type DoctorDetail = {
  doctorId: number;
  contentHTML: string;
  contentMarkdown: string;
  action: string;
  description: string;
};

const getTopDoctor = async () => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: 'R2' },
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: db.AllCode,
          as: 'positionData',
          attributes: ['valueEn', 'valueVi'],
        },
        {
          model: db.AllCode,
          as: 'genderData',
          attributes: ['valueEn', 'valueVi'],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      errCode: 0,
      data: doctors,
    };
  } catch (e) {
    console.log(e);
  }
};

const getAllDoctors = async () => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: 'R2' },
      attributes: {
        exclude: ['password', 'image'],
      },
    });
    return {
      errCode: 0,
      data: doctors,
    };
  } catch (e) {
    console.log(e);
  }
};

const saveDoctorInfo = async (inputData: DoctorDetail) => {
  try {
    if (
      !inputData.doctorId ||
      !inputData.contentHTML ||
      !inputData.contentMarkdown ||
      !inputData.action
    ) {
      return {
        errCode: 1,
        errMessage: 'Missing parameter',
      };
    }
    const { contentHTML, contentMarkdown, description, doctorId } = inputData;
    if (inputData.action === 'CREATE') {
      await db.Markdown.create({
        contentHTML,
        contentMarkdown,
        description,
        doctorId,
      });
    } else if (inputData.action === 'EDIT') {
      const doctorMarkdown = await db.Markdown.findOne({
        where: { doctorId },
        raw: false,
      });
      if (!doctorMarkdown) {
        return {
          errCode: 404,
          errMessage: 'Can not find Markdown',
        };
      }
      doctorMarkdown.contentHTML = contentHTML;
      doctorMarkdown.contentMarkdown = contentMarkdown;
      doctorMarkdown.description = description;
      doctorMarkdown.updateAt = new Date();
      await doctorMarkdown.save();
    }
    return {
      errCode: 0,
      errMessage: 'Save info doctor succeed',
    };
  } catch (e) {
    console.log(e);
  }
};

const getDoctorById = async (doctorId: string) => {
  try {
    if (!doctorId) {
      return {
        errCode: 1,
        errMessage: 'Missing required parameters!',
      };
    }
    let dataDoctor = await db.User.findOne({
      where: { id: doctorId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: db.Markdown,
          attributes: ['description', 'contentHTML', 'contentMarkdown'],
        },
        {
          model: db.AllCode,
          as: 'positionData',
          attributes: ['valueEn', 'valueVi'],
        },
      ],
      raw: false,
      nest: true,
    });
    if (dataDoctor && dataDoctor.image) {
      dataDoctor.image = new Buffer(dataDoctor.image, 'base64').toString(
        'binary',
      );
    }
    if (!dataDoctor) dataDoctor = {};
    return {
      errCode: 0,
      data: dataDoctor,
    };
  } catch (e) {
    console.log(e);
  }
};

export default {
  getTopDoctor,
  getAllDoctors,
  saveDoctorInfo,
  getDoctorById,
};
