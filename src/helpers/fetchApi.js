const fetchApi = async(api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    error.message = 'Erro na requisição';
  }
};

export default fetchApi;
