const router = require('express').Router();
const questionController = require('../controller/questions')

router.post('/', questionController.postQuestions);
router.get('/', questionController.getQuestions);
router.post('/answers/:id', questionController.postAnswers);
router.post('/upvote/:id', questionController.upvoteAnswers);

module.exports = router;