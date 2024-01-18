import authenticate from "./middleware/authenticate";
import uploader from './middleware/uploader';

var router = require('express').Router();

var authRouter = require('./modules/auth/auth.router');
var noteRouter = require('./modules/note/note.router');
var userRouter = require('./modules/user/user.router');

router.use('/auth', authRouter)
router.use('/note', authenticate, noteRouter)
router.use('/user', authenticate, uploader.single('profile'), userRouter)

module.exports = router;