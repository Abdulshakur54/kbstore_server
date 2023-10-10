import { PositiveFloatResolver, PositiveIntResolver, DateTimeResolver } from "graphql-scalars"
import { createShop, updateShop, deleteShop, addShopProducts, addUsers, removeShopProduct, removeUser } from "./resolvers/shopResolver.js"
import { createUser, updateUser, deleteUser, getUsers, getUser } from "./resolvers/userResolver.js"
import { createProduct, updateProduct, deleteProduct } from "./resolvers/productResolver.js"
import { createCategory, updateCategory, deleteCategory } from "./resolvers/categoryResolver.js"
import { idResolver } from "../utilities.js"
export default {
    DateTime: DateTimeResolver,
    PositiveFloat: PositiveFloatResolver,
    PositiveInt: PositiveIntResolver,
    Query: {
        shops: () => { return [{ name: 'abcd' }, { name: 'abc' }] },
        users: getUsers,
        user: getUser,
    },
    Mutation: {
        createShop,
        updateShop,
        deleteShop,
        addShopProducts,
        addUsers,
        removeShopProduct,
        removeUser,
        createProduct,
        updateProduct,
        deleteProduct,
        createUser,
        updateUser,
        deleteUser,
        createCategory,
        updateCategory,
        deleteCategory,


    },
    User: {
        id: idResolver
    }
}