import returnHash from '../../helpers/returnHash';
import fetchApi from '../../helpers/fetchApi';

export const LOGIN_SUCESS = 'LOGIN_SUCESS';
export const SAVE_SCORE = 'SAVE_SCORE';

export const loginSucess = (name, gravatarEmail, image) => ({
  type: LOGIN_SUCESS,
  payload: {
    name,
    image,
    gravatarEmail,
  },
});

export const loginRequest = (name, gravatarEmail, push) => {
  const image = `https://www.gravatar.com/avatar/${returnHash(gravatarEmail)}`;
  return async (dispatch) => {
    const response = await fetchApi(
      'https://opentdb.com/api_token.php?command=request',
    );
    localStorage.setItem('token', response.token ?? '');
    push('/game');
    dispatch(loginSucess(name, gravatarEmail, image));
  };
};

export const saveScore = (score, assertions) => ({
  type: SAVE_SCORE,
  payload: {
    assertions,
    score,
  },
});
