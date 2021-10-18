import bcrypt from 'bcryptjs';
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);

type UpdateUser = {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
}
type NewUser = {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phonenumber: string;
    gender: string;
    roleId: any;
}

const createNewUser = async (data: NewUser) => {
    try {
        let hassPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hassPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
        })
        return ('create a new user succeed')
    } catch (e) {
        console.log(e);
    }
}

const hashUserPassword = (password: string) => {
    try {
        return bcrypt.hashSync(password, salt);
    } catch (e) {
        console.log(e);
    }
}

const getAllUser = () => {
    try {
        return db.User.findAll({
            raw: true
        });
    } catch (e) {
        console.log(e);
    }
}

const getUserInfoById = async (userId: string) => {
    try {
        const user = await db.User.findOne({
            where: { id: userId },
            raw: true
        })
        if (user) {
            return (user)
        } else {
            return ({})
        }
    } catch (e) {
        console.log(e);
    }
}

const updateUserData = async (data: UpdateUser) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;

            await user.save();
            return await db.User.findAll();
        } else {
            console.log('Cant not find user')
        }
        await db.User.update({
        })
    } catch (e) {
        console.log(e)
    }
}

const deleteUserById = async (userId: any) => {
    try {
        const user = await db.User.findOne({
            where: { id: userId }
        })
        if (user) {
            await user.destroy();
        }
    } catch (e) {
        console.log(e)
    }
}

export default {
    createNewUser,
    hashUserPassword,
    getAllUser,
    getUserInfoById,
    updateUserData,
    deleteUserById
}