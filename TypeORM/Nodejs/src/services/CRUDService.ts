import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../models/user';
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
  phoneNumber: string;
  gender: string;
  roleId: any;
};

const userRepository = getRepository(User);

const createNewUser = async (data: NewUser) => {
  try {
    hashUserPassword(data.password);
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
    } = data;
    userRepository.create({
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
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
    return await userRepository
      .createQueryBuilder("user")
      .getMany()
  } catch (e) {
    console.log(e);
  }
};

const getUserInfoById = async (userId: string) => {
  try {
    return await userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: userId })
      .getOne();
  } catch (e) {
    console.log(e);
  }
};

const updateUserData = async (data: UpdateUser) => {
  try {
    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: data.id })
      .getOne();
    const { firstName, lastName, address } = data;
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.address = address;
      await userRepository.save(user);
      return await userRepository
        .createQueryBuilder("user")
        .getOne()
    } else {
      console.log(`Can't find user`);
    }
    await userRepository
      .createQueryBuilder()
      .update()
      .execute();
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
