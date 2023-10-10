import DS from '../datasources/dataSource.js'
import { capitalizeEachWord } from '../../utilities.js'
const createProduct = async (_, { name, category, costPrice, image, description }) => {
    const now = new Date()
    const result = await DS.createProduct({ name, category, costPrice, image, description, created: now, updated: now })
    return {
        code: 201,
        success: true,
        message: `${capitalizeEachWord(name)} was added successfully`,
        product: {
            id: result.insertedId,
            name,
            category,
            costPrice,
            image,
            description,
            created: now,
            updated: now
        }
    }
}
const updateProduct = async (_, { name, category, costPrice, image, description }) => {
    const result = await DS.updateProduct({ name, category, costPrice, image, description })
    return {
        code: 200,
        success: true,
        message: `Update was successful`,
        product: {...result,id: result._id}
    }
}
const deleteProduct = async (_, { name}) => {
    const result = await DS.deleteProduct(name)
    return {
        code: 200,
        success: true,
        message: `${capitalizeEachWord(name)} was deleted successfully`,
        product: {...result,id: result._id}
    }
}
export {createProduct, updateProduct, deleteProduct}