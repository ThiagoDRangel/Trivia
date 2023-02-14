export const checkEmail = (event) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(event);
};

export const checkName = (event) => {
  const MIN_LENGTH = 2;
  return event.length >= MIN_LENGTH;
};
