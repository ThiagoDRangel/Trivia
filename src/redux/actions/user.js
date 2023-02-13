export const LOGIN = 'LOGIN';

export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password,
  },
});
