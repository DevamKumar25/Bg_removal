import multer from "multer";

// creating multer middlewares for parsing formdata

const storage = multer.diskStorage({
    filename : function(re,file,callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})


export const upload = multer({storage})
