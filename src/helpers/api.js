import md5 from 'crypto-js/md5';

const url = 'https://opentdb.com/api_token.php?command=request';

const getUrl = async () => {
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

const getProfileImage = (email) => {
  const profile = md5(email).toString();
  const imageUrl = `https://www.gravatar.com/avatar/${profile}`;
  return (
    <img
      src={ imageUrl }
      alt="Imagem de perfil"
      data-testid="header-profile-picture"
      className="header-profile-picture"
    />);
};

export { getUrl, getProfileImage };