export const checkEmail = (event) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  return regex.test.apply(event);
};

export const checkName = (event) => {
  const MIN_LENGTH = 2;
  return event.length >= MIN_LENGTH;
};
