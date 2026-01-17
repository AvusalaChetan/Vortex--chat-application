import multer from 'multer';

 const mulerUpload = multer({
    // limits:{
    //     fileSize:1024*1024*5
    // }
})

const singleAvatar = mulerUpload.single('avatar')

export {singleAvatar}