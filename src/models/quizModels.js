import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  directions: {
    type: String,
    required: false,
  },
  rules: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

const questionSchema = new Schema({
  tags: {
    type: Array,
    required: false,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  question: {
    type: String,
    required: 'Quiz Question is Required',
  },
  questionType: {
    type: String,
    enum: ['mcq', 'msq', 't&f', 'sq', 'tita'],
    required: true,
  },
  marks: {
    type: Number,
    default: 1,
    required: true,
  },
  negativeMark: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array,
    required: true,
  },
  answer: {
    type: Array,
    required: true,
  },
});
const Question = mongoose.model('Questions', questionSchema);

export { Question, Quiz };
