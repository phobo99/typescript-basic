import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

type UpdateUser = {
  id: string;
  roleId: string;
  positionId: string;
  gender: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  avatar: string;
};

type CreateUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
  roleId: string;
  positionId: string;
  avatar: string;
};

const hashUserPassword = (password: string) => {
  try {
    return bcrypt.hashSync(password, salt);
  } catch (e) {
    console.log(e);
  }
};

const handleUserLogin = async (email: string, password: string) => {
  let userData: {
    errCode: number;
    errMessage: string;
    user: object;
  };
  try {
    const emailExist = await checkUserEmail(email);
    if (!emailExist) {
      userData = {
        errCode: 1,
        errMessage: `Your's Email isn't exist in your system. Plz try other email`,
        user: {},
      };
    } else {
      const user = await db.User.findOne({
        attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
        where: { email: email },
        raw: true,
      });
      const check = bcrypt.compareSync(password, user.password);
      if (check) {
        delete user.password;
        userData = {
          errCode: 0,
          errMessage: 'OK',
          user: user,
        };
      } else {
        userData = {
          errCode: 3,
          errMessage: 'Wrong password',
          user: {},
        };
      }
    }
    return userData;
  } catch (e) {
    console.log(e);
  }
};

const checkUserEmail = async (userEmail: string) => {
  try {
    return await db.User.findOne({
      where: { email: userEmail },
    });
  } catch (e) {
    console.log(e);
  }
};

const getAllUsers = async (userId: any) => {
  try {
    let users = '';
    if (userId === 'ALL') {
      users = await db.User.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
    } else {
      users = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        },
      });
    }
    return users;
  } catch (e) {
    console.log(e);
  }
};

const createNewUser = async (data: CreateUser) => {
  try {
    const checkEmail = await checkUserEmail(data.email);
    if (checkEmail) {
      return {
        errCode: 1,
        errMessage: 'Your email already used, Plz try another email',
      };
    }
    hashUserPassword(data.password);
    await db.User.create({
      ...data,
      image: data.avatar,
    });
    return {
      errCode: 0,
      message: 'OK',
    };
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (userId: number) => {
  const user = await db.User.findOne({
    where: { id: userId },
  });
  if (!user) {
    return {
      errCode: 2,
      errMessage: `The user isn't exist`,
    };
  }
  await db.User.destroy({
    where: { id: userId },
  });
  return {
    errCode: 0,
    errMessage: `The user deleted`,
  };
};

const updateUserData = async (data: UpdateUser) => {
  try {
    if (!data.id || !data.roleId || !data.positionId || !data.gender) {
      return {
        errCode: 2,
        errMessage: 'Missing required parameters',
      };
    }
    const user = await db.User.findOne({
      where: { id: data.id },
      raw: false,
    });
    const {
      firstName,
      lastName,
      address,
      roleId,
      positionId,
      gender,
      phonenumber,
    } = data;
    if (!user) {
      return {
        errCode: 1,
        errMessage: `User's not found`,
      };
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.roleId = roleId;
    user.positionId = positionId;
    user.gender = gender;
    user.phonenumber = phonenumber;
    if (data.avatar) {
      user.image = data.avatar;
    }
    await user.save();
    return {
      errCode: 0,
      message: 'Update the user succeed!',
    };
  } catch (e) {
    console.log(e);
  }
};

const getAllCodeService = async (inputType: any) => {
  try {
    if (!inputType) {
      return {
        errCode: 1,
        errMessage: 'Missing required parameters',
      };
    }
    const allcode = await db.Allcode.findAll({
      where: { type: inputType },
    });
    return {
      errCode: 0,
      data: allcode,
    };
  } catch (e) {
    console.log(e);
  }
};

export default {
  handleUserLogin,
  checkUserEmail,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllCodeService,
};
