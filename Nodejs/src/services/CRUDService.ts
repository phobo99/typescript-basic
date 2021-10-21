import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

type UpdateUser = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
};
type NewUser = {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
  roleId: any;
};

const createNewUser = async (data: NewUser) => {
  try {
    hashUserPassword(data.password);
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      roleId,
    } = data;
    await db.User.create({
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      gender: data.gender === '1' ? true : false,
      roleId,
    });
    return 'create a new user succeed';
  } catch (e) {
    console.log(e);
  }
};

const hashUserPassword = (password: string) => {
  try {
    return bcrypt.hashSync(password, salt);
  } catch (e) {
    console.log(e);
  }
};

const getAllUser = async () => {
  try {
    return await db.User.findAll({
      raw: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const getUserInfoById = async (userId: string) => {
  try {
    return await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUserData = async (data: UpdateUser) => {
  try {
    const user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();
      return await db.User.findAll();
    } else {
      console.log(`Can't find user`);
    }
    await db.User.update({});
  } catch (e) {
    console.log(e);
  }
};

export default {
  createNewUser,
  hashUserPassword,
  getAllUser,
  getUserInfoById,
  updateUserData,
};
