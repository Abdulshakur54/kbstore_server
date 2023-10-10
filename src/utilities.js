import { ObjectId } from "mongodb";
function capitalizeWord(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeEachWord (sen){
    const words = sen.split(" ");
    const results = []
    for(let word of words){
        results.push(capitalizeWord(word))
    }
    return results.join(" ")
}

function idResolver({id, _id}){
    return id ? id: _id
}

function objectId(id){
    return new ObjectId(id)
}

function objectIds(ids){
    const objIds = []
    for(let id of ids){
        objIds.push(objectId(id))
    }
    return objIds
}

export {capitalizeEachWord, capitalizeWord, idResolver, objectId, objectIds}