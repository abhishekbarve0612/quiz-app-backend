import { Quiz } from '../models/quizModels';

const getQuizList = (req, res) => {
  Quiz.find({}, (err, quiz) => {
    if (err) {
      res.send(err);
    }
    res.json(quiz);
  });
};

const addQuiz = (req, res) => {
  const newQuiz = new Quiz(req.body);

  newQuiz.save((err, quiz) => {
    if (err) {
      res.send(err);
    }
    res.json(quiz);
  });
};
const updateQuiz = (req, res) => {
  Quiz.findOneAndUpdate(
    { _id: req.params.qid },
    req.body,
    { new: true, useFindAndModify: false },
    (err, quiz) => {
      if (err) {
        res.send(err);
      }
      res.json(quiz);
    }
  );
};
const getQuiz = (req, res) => {
  Quiz.findById(req.params.qid, (err, quiz) => {
    if (err) {
      res.send(err);
    }
    res.json(quiz);
  });
};
const deleteQuiz = (req, res) => {
  Quiz.remove(req.params.qid, (err, quiz) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Quiz deleted Successfully!!' });
  });
};

export { addQuiz, getQuiz, updateQuiz, deleteQuiz, getQuizList };
