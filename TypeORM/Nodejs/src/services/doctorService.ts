import { getRepository } from "typeorm";
import { Markdown } from "../models/markdown";
import { User } from "../models/user";
type DetailDoctor = {
  doctorId: number;
  contentHTML: string;
  contentMarkdown: string;
  action: string;
  description: string;
};


const userRepository = getRepository(User);

const getTopDoctorHome = async () => {
  try {
    const doctors = await userRepository
      .createQueryBuilder("user")
      .where("user.roleId = :roleId", { roleId: 'R2' })
      .orderBy('user.createdAt', 'DESC')
      .leftJoinAndSelect("user.allcode", "allcode")
      .getMany()
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
    const doctors = await userRepository
      .createQueryBuilder("user")
      .where("user.roleId = :roleId", { roleId: 'R2' })
      .getMany()
    return {
      errCode: 0,
      data: doctors,
    };
  } catch (e) {
    console.log(e);
  }
};
const markdownRepository = getRepository(Markdown);
export const saveDetailInfoDoctor = async (inputData: DetailDoctor) => {
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
      markdownRepository.create({
        contentHTML,
        contentMarkdown,
        description,
        doctorId,
      });
    } else if (inputData.action === 'EDIT') {
      const doctorMarkdown = await markdownRepository.findOne({
        id: doctorId
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
      await markdownRepository.save(doctorMarkdown);
    }
    return {
      errCode: 0,
      errMessage: 'Save info doctor succeed',
    };
  } catch (e) {
    console.log(e);
  }
};

const getDetailDoctorById = async (inputId: string) => {
  try {
    if (!inputId) {
      return {
        errCode: 1,
        errMessage: 'Missing required parameters!',
      };
    }
    let dataDoctor = await userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: inputId })
      .leftJoinAndSelect("user.markdown", "markdown")
      .leftJoinAndSelect("user.allcode", "allcode")
      .getOne()
    if (dataDoctor && dataDoctor.image) {
      dataDoctor.image = new Buffer(dataDoctor.image, 'base64').toString(
        'binary',
      );
    }
    if (!dataDoctor) return
    return {
      errCode: 0,
      data: dataDoctor,
    };
  } catch (e) {
    console.log(e);
  }
};

export default {
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInfoDoctor,
  getDetailDoctorById,
};
