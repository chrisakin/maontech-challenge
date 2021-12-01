const router = require('express').Router();
const questionController = require('../controller/questions')
const checkJWT = require('../middleware/check-jwt');

router.post('/', checkJWT, (questionController.postQuestions));
router.get('/', questionController.getQuestions);
router.post('/answers/:id',checkJWT, (questionController.postAnswers));
router.post('/upvote/:id', questionController.upvoteAnswers);
router.get('/search', questionController.searchQuestions);


module.exports = router;