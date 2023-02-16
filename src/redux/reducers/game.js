import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  answersShuffle: [],
};

function shuffle(array) {
  const NUMBER = 0.5;
  return array.sort(() => Math.random() - NUMBER);
}

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return ({
      ...state,
      questions: action.payload.results,
      answersShuffle: action.payload.results.map((answer) => {
        const answersToShuffle = [answer.correct_answer, ...answer.incorrect_answers];
        return shuffle(answersToShuffle);
      }),
    });
  default:
    return state;
  }
};

export default game;