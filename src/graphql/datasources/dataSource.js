import conn from '../../connection/connection.js'
import error from '../customErrors.js';
import { capitalizeEachWord, objectId, objectIds } from '../../utilities.js';
export default class DS {
    static db = conn.db('store');

    static async createShop(name, created, updated) {
        try {
            return await this.db.collection('shops').insertOne({ name, created, updated })
        } catch (err) {
            error(err, name)
        }

    }


    static async updateShop(name, newName) {
        try {
            return await conn.withSession(async (session) => {
                return session.withTransaction(async (session) => {
                    await this.db.collection('shopProducts').updateMany({ shop: name }, { $set: { shop: newName } }, { session })
                    return await this.db.collection('shops').findOneAndUpdate({ name }, { $set: { name: newName }, $currentDate: { updated: true } }, { returnDocument: "after", session });

                })
            })
        } catch (err) {
            error(err, name)
        }

    }


    static async deleteShop(name) {
        try {
            return await conn.withSession(async (session) => {
                return session.withTransaction(async (session) => {
                    await this.db.collection('shopProducts').deleteMany({ shop: name }, { session })
                    return await this.db.collection('shops').findOneAndDelete({ name }, { session });
                })
            })
        } catch (err) {
            error(err, name)
        }

    }


    static async getShops() {

        try {
            return await this.db.collection('shops').find().sort({shop:1}).toArray()
        } catch (err) {
            error(err)
        }

    }
  


    static async createProduct({ name, category, costPrice, image, description, created, updated }) {
        try {
            return await this.db.collection('products').insertOne({ name, category, costPrice, image, description, created, updated })
        } catch (err) {
            error(err, name)
        }

    }


    static async getProducts() {

        try {
            return await this.db.collection('products').find().sort({name:1}).toArray()
        } catch (err) {
            error(err)
        }

    }

    static async getShopProcucts(parentId) {

        try {
            return await this.db.collection('shopProducts').find({parentId: parentId}).sort({name:1}).toArray()
        } catch (err) {
            error(err)
        }

    }


    static async updateProduct({ name, category, costPrice, image, description }) {
        try {
            return await conn.withSession(async (session) => (session.withTransaction(async (session) => {
                await this.db.collection('shopProducts').updateMany({ name }, { $set: { category, costPrice, image, description }, $currentDate: { updated: true } }, { session })
                return await this.db.collection('products').findOneAndUpdate({ name }, { $set: { category, costPrice, image, description }, $currentDate: { updated: true } }, { returnDocument: "after", session })
            })))

        } catch (err) {
            error(err, name)
        }

    }
    static async deleteProduct(name) {
        try {
            const productIds = await this.db.collection('shopProducts').find({ name }).project({ _id: 1 }).toArray()
            return await conn.withSession(async (session) => (session.withTransaction(async (session) => {
                await this.db.collection('shopProducts').deleteMany({ name }, { session })
                await this.db.collection('shops').updateMany({ products: { $in: productIds } }, { $pullAll: { products: productIds } }, { session })
                return await this.db.collection('products').findOneAndDelete({ name }, { session })
            })))

        } catch (err) {
            error(err, name)
        }

    }


    static async createUser({ firstName, lastName, username, type, created, updated }) {
        try {
            return await this.db.collection('users').insertOne({ firstName, lastName, username, type, created, updated })
        } catch (err) {
            error(err, username)
        }

    }
    static async updateUser({ firstName, lastName, username }) {
        try {
            return await this.db.collection('users').findOneAndUpdate({ username }, { $set: { firstName, lastName }, $currentDate: { updated: true } }, { returnDocument: "after" })
        } catch (err) {
            error(err, username)
        }

    }
    static async deleteUser(username) {

        try {
            return await conn.withSession(async (session) => session.withTransaction(async (session) => {
                await this.db.collection('shops').updateMany({ users: username }, { $pull: { "$users": username } }, { session })
                return await this.db.collection('users').findOneAndDelete({ username }, { session })
            }))
        } catch (err) {
            error(err, username)
        }

    }

    static async getUsers() {

        try {
            return await this.db.collection('users').find({type:"staff"}).sort({username:1}).toArray()
        } catch (err) {
            error(err)
        }

    }
    static async getUser(username) {

        try {
            return await this.db.collection('users').findOne({username})
        } catch (err) {
            error(err, username)
        }

    }
    
   
    static async getCategories() {

        try {
            return await this.db.collection('categories').find().sort({name: 1}).toArray()
        } catch (err) {
            error(err)
        }

    }
    static async getCategory(name) {

        try {
            return await this.db.collection('categories').findOne({name})
        } catch (err) {
            error(err)
        }

    }


    static async createCategory({ name, created, updated }) {

        try {
            return await this.db.collection('categories').insertOne({ name, created, updated })
        } catch (err) {
            error(err, name)
        }

    }

    static async updateCategory({ name, newName }) {

        try {
            return await conn.withSession(async (session) => {
                return session.withTransaction(async (session) => {
                    await this.db.collection('shopProducts').updateMany({ category: name }, { $set: { category: newName } }, { session })
                    await this.db.collection('products').updateMany({ category: name }, { $set: { category: newName } }, { session })
                    await this.db.collection('transactions').updateMany({ category: name }, { $set: { category: newName } }, { session })
                    return await this.db.collection('categories').findOneAndUpdate({ name }, { $set: { name: newName } }, { returnDocument: "after", session })
                })
            })
        } catch (err) {
            error(err, name)
        }

    }
    static async deleteCategory(name) {

        try {
            return this.db.collection('categories').findOneAndDelete({ name })
        } catch (err) {
            error(err, name)
        }

    }

    static async addUsers(shop, usernames) {

        try {
            return this.db.collection('shops').updateOne({ name: shop }, { $addToSet: { users: { $each: usernames } } })
        } catch (err) {
            error(err, usernames)
        }

    }

    static async removeUser(shop, username) {
        try {
            return this.db.collection('shops').updateOne({ name: shop }, { $pull: { "users": username } })
        } catch (err) {
            error(err, username)
        }

    }


    static async addShopProducts(shop, shopProducts, created) {
        let productIds = [];
        shopProducts.sort((a, b) => { if (a.parentId < b.parentId) { return -1 } return 1 })

        for (let shopProduct of shopProducts) {
            productIds.push(shopProduct.parentId)
        }

        productIds = objectIds(productIds)
        const products = await this.db.collection('products').find({ _id: { $in: productIds } }).project({ _id: 0, created: 0, updated: 0 }).sort({ _id: 1 }).toArray()
        const productsDetails = [];
        let counter = 0;

        for (let product of products) {
            productsDetails.push({ ...product, ...shopProducts[counter], shop, created, updated: created })
            counter++;
        }

        try {
            return await conn.withSession(async (session) => session.withTransaction(async (session) => {
                const result = await this.db.collection('shops').updateOne({ name: shop }, { $addToSet: { products: { $each: productIds } } }, { session })
                if (result.modifiedCount === 0) {
                    if (result.matchedCount === 0) {
                        throw new Error(`${capitalizeEachWord(shop)} does not exist`)
                    }
                    throw new Error(`Only products that have not been added to ${capitalizeEachWord(shop)} should be selected`)
                }
                await this.db.collection('shopProducts').insertMany(productsDetails, { session })
                return result;
            }))
        } catch (err) {
            error(err, productIds.toString())
        }

    }

    static async removeShopProduct(shop, productId) {
        const prodId = objectId(productId)
        try {
            return conn.withSession(async (session)=>session.withTransaction(async (session)=>{
                await this.db.collection('shops').updateOne({ name: shop }, { $pull: { "products": prodId } }, {session})
                return await this.db.collection('shopProducts').deleteOne({_id: productId}, {session})
            }))
           
        } catch (err) {
            error(err, productId)
        }

    }
}