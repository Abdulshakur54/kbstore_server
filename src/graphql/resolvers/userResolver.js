import DS from '../datasources/dataSource.js'
import { capitalizeEachWord } from '../../utilities.js'
const createUser = async (_, { firstName, lastName, username, type }) => {
    const now = new Date()
    const result = await DS.createUser({ firstName, lastName, username, type, created: now, updated: now })
    return {
        code: 201,
        success: true,
        message: `${capitalizeEachWord(firstName + ' ' + lastName)} has been added successfully`,
        user: {
            id: result.insertedId,
            firstName,
            lastName,
            username,
            type,
            created: now,
            updated: now
        }
    }
}
const updateUser = async (_, { firstName, lastName, username }) => {
    const result = await DS.updateUser({ firstName, lastName, username})
    return {
        code: 200,
        success: true,
        message: `Update was successful`,
        user: {...result,id: result._id}
    }
}
const deleteUser = async (_, {username}) => {
    const result = await DS.deleteUser(username)
    return {
        code: 200,
        success: true,
        message: `${username} was deleted successfully`,
        user: {...result, id: result._id}
    }
}

const getUsers = async (_,{username}) => {

    return await DS.getUsers()

}

const getUser = async (_, {username}) => {
   return await DS.getUser(username)
}
export {createUser, updateUser, deleteUser,getUsers, getUser}