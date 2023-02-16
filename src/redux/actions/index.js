export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_INFO = 'SAVE_INFO';

export const saveInfo = (payload) => ({
  type: SAVE_INFO,
  payload,
});

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const actionFetchQuestionsApi = (token) => async (dispatch) => {
  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await fetchApi.json();
  dispatch(saveQuestions(response));
  return response;
};

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});