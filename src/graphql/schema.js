export default `#graphql
    scalar DateTime
    scalar PositiveInt
    scalar PositiveFloat
    
    type Query{
        shops: [Shop]
        users: [User]
        user(username: String!): User!
        categories: [Category]
        category(name: String!): Category!
        products: [Product]
        product(name: String!): Product!
        shopProduct: [ShopProduct]
    }

    type Mutation{
        createShop(name: String!): ModifiedShopResponse!
        updateShop(name: String!, newName: String!): ModifiedShopResponse!
        deleteShop(name: String!): ModifiedShopResponse!
        addShopProducts(shop: String!, shopProducts: [shopProductInput!]!): SimpleResponse!
        addUsers(shop: String!, usernames: [String]): SimpleResponse!
        removeShopProduct(shop: String!, productId: ID!): SimpleResponse!
        removeUser(shop: String!, username: String!): SimpleResponse!
        createProduct(name: String!,  category: String!, costPrice: PositiveFloat!, image: String = "", description: String = ""): ModifiedProductResponse!
        updateProduct(name: String!,  category: String!, costPrice: PositiveFloat!, image: String = "", description: String = ""): ModifiedProductResponse!
        deleteProduct(name: String!): ModifiedProductResponse!
        createUser(firstName: String!, lastName: String!, username: String!, type: String = "staff"): ModifiedUserResponse!
        updateUser(firstName: String!, lastName: String!, username: String!): ModifiedUserResponse!
        deleteUser(username: String!): ModifiedUserResponse!
        createCategory(name: String!): ModifiedCategoryResponse!
        updateCategory(name: String!, newName: String!): ModifiedCategoryResponse!
        deleteCategory(name: String!): ModifiedCategoryResponse!
    }

    type Shop{
        id: ID!
        name: String!
        products: [ShopProduct]
        users: [User]
        created: DateTime!
        updated: DateTime!
    }

    type Product{
        id: ID!
        name: String!
        description: String
        image: String
        category: String!
        costPrice: PositiveFloat!
        created: DateTime!
        updated: DateTime!
    }

    type ShopProduct{
        id: ID!
        name: String!
        description: String!
        image: String
        category: String!
        costPrice: PositiveFloat!
        sellingPrice: PositiveFloat!
        parentId: ID!
        shop: String!
        quantity: PositiveInt!
        created: DateTime!
        updated: DateTime!
    }

    type User{
        id: ID!
        username: String!
        firstName: String!
        lastName: String!
        type: String!
        created: DateTime!
        updated: DateTime!
    }

    type Category{
        id: ID!
        name: String!
        created: DateTime!
        updated: DateTime!
    }


    enum UserType{
        admin
        staff
    }

    input shopProductInput{
 
        parentId: ID!
        sellingPrice: PositiveFloat!
        quantity: PositiveInt!
    }





    " *********************************Responses ***************************************************"





    interface MutationResponse{
        code: Int!
        success: Boolean!
        message: String
    }
    type SimpleResponse{
        code: Int!
        success: Boolean!
        message: String
    }
    type ModifiedShopResponse implements MutationResponse{
        code: Int!
        success: Boolean!
        message: String
        shop: Shop!
    }
    type ModifiedUserResponse implements MutationResponse{
        code: Int!
        success: Boolean!
        message: String
        user: User!
    }
    type ModifiedProductResponse implements MutationResponse{
        code: Int!
        success: Boolean!
        message: String
        product: Product!
    }
    type ModifiedCategoryResponse implements MutationResponse{
        code: Int!
        success: Boolean!
        message: String
        category: Category!
    }
`