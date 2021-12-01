const router = require('express').Router();
const profileController = require('../controller/profile')
const checkJWT = require('../middleware/check-jwt');

router.post('/', checkJWT, (profileController.createProfile));
router.get('/', checkJWT, (profileController.getProfile));
router.get('/user/:username', profileController.getuserbyUsername);
router.get('/user/:id', profileController.getuserbyId);
router.get('/allusers', profileController.getallUsers);
router.delete('/user/:id',checkJWT, (profileController.deleteUser));
router.get('/:username', profileController.getuserbyUsername);
router.post('/workrole', checkJWT, (profileController.addWorkrole));
router.delete('/workrole/:id',checkJWT, (profileController.removeWorkrole));


module.exports = router;