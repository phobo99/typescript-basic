import db from "../models/index";
import bcrypt from 'bcryptjs';
import _ from 'lodash';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password: string) => {
    return new Promise((resolve, reject) => {
        try {
            const hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

const handleUserLogin = (
    email: string,
    password: string
) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData: { errCode: number, errMessage: string, user: any, } = {
                errCode: 0,
                errMessage: "",
                user: undefined
            };
            const isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                const user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'], // lấy ra 3 trường
                    where: { email: email }, // vẫn kiểm tra email, trừ trường hợp người ta xoá trong lúc hàm checkEmail trên đang chạy
                    raw: true // ẩn phần k cần thiết
                });
                if (user) {
                    //compare password
                    // kiểm tra xem nhập password có đúng không
                    const check = bcrypt.compareSync(password, user.password) // false
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;   // xoá trường password
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User isn't not found`
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

// kiểm tra xem email đã có trong db hay chưa
const checkUserEmail = async (userEmail: string) => {
    try {
        let user = await db.User.findOne({
            where: { email: userEmail }
        })
        if (user) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
    }

}

// cach viet function khac
export async function getAllUserRecoed(userId: any) {
    try {
        if (_.isEmpty(userId)) {
            // khoong co id get all
        } else {
            // find One
        }
        return await db.User.findAll({})
    } catch (e) {
        console.log(e)
    }
}

const getAllUsers = (userId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

type CreateUser = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phonenumber: string,
    gender: string,
    roleId: string,
    positionId: string,
    avatar: string
}
const createNewUser = (data: CreateUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email already used, Plz try another email'
                })
            } else {
                const hassPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hassPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (userId: number) => {
    return new Promise(async (resolve, reject) => {
        const user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: `The user deleted`
        })
    })
}

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
}
let updateUserData = (data: UpdateUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user succeed!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllCodeService = (typeInput: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let res: any = {}
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }

        } catch (e) {
            reject(e)
        }
    })
}
export default {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    getAllUserRecoed, //demo
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService
}