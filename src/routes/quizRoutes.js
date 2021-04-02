import {
  addQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizList,
} from '../controllers/quizController';
import {
  addQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
} from '../controllers/questionController';
import { loginRequired, login, register } from '../controllers/userController';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.json({ message: 'APIs can be found here!!' });
  });
  app.route('/quizzes').get((req, res, next) => {
    console.log(`Request from ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getQuizList);
  app.route('/new-quiz').post(loginRequired, addQuiz);
  app
    .route('/quiz/:qid')
    .get(getQuiz)
    .put(loginRequired, updateQuiz)
    .delete(loginRequired, deleteQuiz);
  app.route('/all-questions').get(getQuestions);
  app.route('/new-question').post(loginRequired, addQuestion);
  app
    .route('/question/:qid')
    .get(getQuestion)
    .put(loginRequired, updateQuestion)
    .delete(loginRequired, deleteQuestion);

  app.route('/register').post(register);
  app.route('/login').post(login);
};

export default routes;
