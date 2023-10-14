import { GraphQLError } from "graphql";
import { capitalizeEachWord } from "../utilities.js";
function error(err, name=''){
    console.log(err)
    switch(err.code){
        case 11000:
            throw new GraphQLError(`${capitalizeEachWord(name)} already exists`)
        default:
            throw new GraphQLError(err.message)
    }
}
export default error;