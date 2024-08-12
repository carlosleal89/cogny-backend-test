const api = require('../api');

// get the data from the api
const getApiData = async () => {
  const { data } = await api.get();
  return data;
};

module.exports = { getApiData };