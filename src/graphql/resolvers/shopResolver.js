import DS from '../datasources/dataSource.js'
import { capitalizeEachWord } from '../../utilities.js'

const createShop = async (_, { name }) => {
    const now = new Date();
    const result = await DS.createShop(name, now, now)
    return {
        code: 201,
        success: true,
        message: `${capitalizeEachWord(name)} was created successfully`,
        shop: {
            id: result.insertedId,
            name,
            products: [],
            users: [],
            created: now,
            updated: now
        }
    }
}

const updateShop = async (_, { name, newName }) => {
    const result = await DS.updateShop(name, newName)
    return {
        code: 200,
        success: true,
        message: `Update was successful`,
        shop: {...result,id: result._id}
    }
}

const deleteShop = async (_, {name}) => {
    const result = await DS.deleteShop(name)
    return {
        code: 200,
        success: true,
        message: `${capitalizeEachWord(name)} was deleted successfully`,
        shop: {...result,id: result._id}
    }
}
const addUsers = async (_, {shop, usernames}) => {
    const result = await DS.addUsers(shop, usernames)
    return {
        code: 200,
        success: result.acknowledged,
        message: 'Selected ' + (usernames.length == 1 ? 'user': 'users') + ' has been added'
    }
}

const removeUser = async (_, {shop, username}) => {
    const result = await DS.removeUser(shop, username)
    return {
        code: 200,
        success: result.acknowledged,
        message: `${username} has been removed from ${capitalizeEachWord(shop)}`
    }
}


const addShopProducts = async (_, {shop,  shopProducts}) => {
    const now = new Date();
    const result = await DS.addShopProducts(shop, shopProducts, now)
    return {
        code: 200,
        success: result.acknowledged,
        message: 'Selected ' + (shopProducts.length == 1 ? 'product': 'products') + ` has been added to ${capitalizeEachWord(shop)}`
    }
}


const removeShopProduct = async (_, {shop, productId}) => {
    const result = await DS.removeShopProduct(shop, productId)
    return {
        code: 200,
        success: result.acknowledged,
        message: `product has been removed from ${capitalizeEachWord(shop)}`
    }
}

export {createShop, updateShop, deleteShop, addShopProducts, addUsers, removeShopProduct, removeUser}