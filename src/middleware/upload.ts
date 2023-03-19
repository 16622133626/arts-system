//中间件的作用
//multer 是处理multipart/form-data 格式中间件
import multer from "multer"
import path from "path"
export const uploadImg = multer({
    //重要！！！ 同时也把前端传来的json格式的参数进行了处理
    //再往后的中间件或者api又可以通过req.body 获取参数
    //定义了文件存储的路径
    //改写了文件在服务器中的名字
    storage:multer.diskStorage({
        destination:"asset/upload/avatar",
        filename:(req,file,callback) => {
            const ext:string = path.extname(file.originalname)
            callback(null,Date.now() + ext)
        } 
    })
})

export const uploadBack = multer({
    storage:multer.diskStorage({
        destination:"asset/upload/backImg",
        filename:(req,file,callback) => {
            const ext:string = path.extname(file.originalname)
            callback(null,Date.now() + ext)
        } 
    })
})

export const uploadWorkImg = multer({
    storage:multer.diskStorage({
        destination:"asset/upload",
        filename:(req,file,callback) => {
            const ext:string = path.extname(file.originalname)
            callback(null,Date.now() + ext)
        } 
    })
})