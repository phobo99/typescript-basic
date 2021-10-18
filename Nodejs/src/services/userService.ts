import db from "../models/index";
import bcrypt from 'bcryptjs';
import _ from 'lodash';

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

const hashUserPassword = (password: string) => {
    try {
        return bcrypt.hashSync(password, salt);
    } catch (e) {
        console.log(e);
    }
}

const handleUserLogin = async (
    email: string,
    password: string
) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData: {
                errCode: number,
                errMessage: string,
                user: object,
            } = {
                errCode: 0,
                errMessage: "",
                user: {}
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
        const user = await db.User.findOne({
            where: { email: userEmail }
        })
        return user;
        
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

const getAllUsers = async (userId: any) => {
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
        return users
    } catch (e) {
        console.log(e)
    }
}

const createNewUser = async (data: CreateUser) => {
    try {
        const check = await checkUserEmail(data.email);
        if (check) {
            return ({
                errCode: 1,
                errMessage: 'Your email already used, Plz try another email'
            })
        } else {
            const hassPasswordFromBcrypt = hashUserPassword(data.password);
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
            return ({
                errCode: 0,
                message: 'OK'
            })
        }
    } catch (e) {
        console.log(e)
    }
}

const deleteUser = async (userId: number) => {
    const user = await db.User.findOne({
        where: { id: userId }
    })
    if (!user) {
        return ({
            errCode: 2,
            errMessage: `The user isn't exist`
        })
    }
    await db.User.destroy({
        where: { id: userId }
    })
    return ({
        errCode: 0,
        errMessage: `The user deleted`
    })
}


const updateUserData = async (data: UpdateUser) => {
    try {
        if (!data.id || !data.roleId || !data.positionId || !data.gender) {
            return ({
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
            return ({
                errCode: 0,
                message: 'Update the user succeed!'
            })
        } else {
            return ({
                errCode: 1,
                errMessage: `User's not found`
            });
        }
    } catch (e) {
        console.log(e);
    }
}

const getAllCodeService = async (typeInput: any) => {
    try {
        if (!typeInput) {
            return ({
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
            return (res)
        }

    } catch (e) {
        console.log(e)
    }
}

export default {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService
}