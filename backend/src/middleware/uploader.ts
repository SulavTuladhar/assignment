import path from "path";
import { ExtendedFile, ExtendedRequest } from "../helpers/interfaces";

var multer = require('multer');

// File filter
function myFilter(req: ExtendedRequest, file: any, cb: CallableFunction) {
    var imageType = file.mimetype.split('/')[0];
    if (imageType == 'image') {
        cb(null, true)
    } else {
        req.fileTypeError = true;
        cb(null, false);
    }
}

const myStorage = multer.diskStorage({
    destination: function (req: ExtendedRequest, file: any, cb: CallableFunction) {
        cb(null, path.join(process.cwd(), '/src/uploads/profile'))
    },
    filename: function (req: ExtendedRequest, file: any, cb: any) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: myStorage,
    fileFilter: myFilter
})

export default upload;