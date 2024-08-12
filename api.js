const axios = require('axios');
const { BASE_URL } = require('./config');

module.exports = axios.create({
  baseURL: BASE_URL,
});