import { Question } from '../models/quizModels';

const getQuestions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.send(err);
    }
    res.json(questions);
  });
};

const addQuestion = (req, res) => {
  const newQuestion = new Question(req.body);

  newQuestion.save((err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};
const updateQuestion = (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.params.qid },
    req.body,
    { new: true, useFindAndModify: false },
    (err, question) => {
      if (err) {
        res.send(err);
      }
      res.json(question);
    }
  );
};
const getQuestion = (req, res) => {
  Question.findById(req.params.qid, (err, question) => {
    if (err) {
      res.send(err);
    }
    res.json(question);
  });
};
const deleteQuestion = (req, res) => {
  Question.remove(req.params.qid, (err, question) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Question deleted Successfully!!' });
  });
};

export { addQuestion, getQuestion, updateQuestion, deleteQuestion, getQuestions };
