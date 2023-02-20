import {MongoClient,MongoClientOptions} from 'mongodb'
//连接数据库的地址
const uri = "mongodb://127.0.0.1:27017";

const options:MongoClientOptions = {
    serverSelectionTimeoutMS:10000,//10s
    // useUnifiedTopolopy:true
}

export const Connect = () => new MongoClient(uri,options)