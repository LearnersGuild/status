require('dotenv').load();

module.exports = {
  codeship: {
    apiUrl: process.env.CODESHIP_API_URL,
    username: process.env.CODESHIP_USERNAME,
    password: process.env.CODESHIP_PASSWORD,
  },
};
