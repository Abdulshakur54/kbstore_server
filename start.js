use store
db.createCollection('categories', {collation: {locale: 'en', strength: 2}})
db.categories.createIndex({name: 1}, {unique: true})
db.createCollection('customers', {collation: {locale: 'en', strength: 2}})
db.customers.createIndex({firstname: 1, lastname: 1},{unique: true})
db.createCollection('messages', {collation: {locale: 'en', strength: 2}})
db.createCollection('products', {collation: {locale: 'en', strength: 2}})
db.products.createIndex({name: 1}, {unique: true})
db.createCollection('shopProducts', {collation: {locale: 'en', strength: 2}})
db.shopProducts.createIndex({name: 1, shop: 1}, {unique: true})
db.createCollection('shops', {collation: {locale: 'en', strength: 2}})
db.shops.createIndex({name: 1}, {unique: true})
db.createCollection('transactions', {collation: {locale: 'en', strength: 2}})
db.createCollection('users', {collation: {locale: 'en', strength: 2}})
db.users.createIndex({username: 1}, {unique: true})
db.users.createIndex({type: 1})
db.categories.createIndex({type: 1})
const products = [
    {"name":"Tecno Camon C8","description":"Very Elegant, with shiny surface","category":"Phone","cost_price":{"$numberInt":"50"},"created":{"$date":{"$numberLong":"1694562725556"}},"updated":{"$date":{"$numberLong":"1694562725556"}}},
    {"name":"Samsung Earpiece","description":"clear sounds and beats","category":"Accessories","cost_price":{"$numberInt":"5"},"created":{"$date":{"$numberLong":"1694562725556"}},"updated":{"$date":{"$numberLong":"1694562725556"}}},
    {"name":"Infinix Hot Note Pro","description":"50MP Camera, 2GB RAM","category":"Phone","cost_price":{"$numberInt":"70"},"created":{"$date":{"$numberLong":"1694562725556"}},"updated":{"$date":{"$numberLong":"1694562725556"}}} 
]