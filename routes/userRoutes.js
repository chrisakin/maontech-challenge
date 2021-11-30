const router = require('express').Router();
const userController = require('../controller/users')

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/profile', userController.getoneProfile);
router.post('/profile', userController.postoneProfile);
router.post('/profiles', userController.getallProfile);
