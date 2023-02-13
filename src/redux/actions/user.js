import returnHash from '../../helpers/returnHash';

export const LOGIN = 'LOGIN';

export const login = (name, email) => {
  const image = `https://www.gravatar.com/avatar/${returnHash(email)}`;
  return {
    type: LOGIN,
    payload: {
      name,
      email,
      image,
    },
  };
};