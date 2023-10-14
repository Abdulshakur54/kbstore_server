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
        category: result
    }
}
const deleteCategory = async (_, { name }) => {
    const result = await DS.deleteCategory(name)
    return {
        code: 200,
        success: true,
        message: `${capitalizeEachWord(name)} was deleted successfully`,
        category: result
    }
}
const getCategories = async () => {
    return await DS.getCategories()
}
const getCategory = async (_, {name}) => {
  return await DS.getCategory(name)
}
export { createCategory, updateCategory, deleteCategory, getCategories, getCategory }