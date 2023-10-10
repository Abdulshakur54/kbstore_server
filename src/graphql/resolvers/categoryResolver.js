import DS from '../datasources/dataSource.js'
import { capitalizeEachWord } from '../../utilities.js'
const createCategory = async (_, { name }) => {
    const now = new Date()
    const result = await DS.createCategory({ name, created: now, updated: now })
    return {
        code: 201,
        success: true,
        message: `${capitalizeEachWord(name)} has been added successfully`,
        category: {
            id: result.insertedId,
            name,
            created: now,
            updated: now
        }
    }
}
const updateCategory = async (_, { name, newName }) => {
    const result = await DS.updateCategory({ name, newName})
    return {
        code: 200,
        success: true,
        message: `Update was successful`,
        category: { ...result, id: result._id }
    }
}
const deleteCategory = async (_, { name }) => {
    const result = await DS.deleteCategory(name)
    return {
        code: 200,
        success: true,
        message: `${capitalizeEachWord(name)} was deleted successfully`,
        category: { ...result, id: result._id }
    }
}
export { createCategory, updateCategory, deleteCategory }