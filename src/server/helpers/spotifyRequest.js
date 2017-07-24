const axios = require('axios');
const qs = require('querystring');

const db = require('../models');

const apiBaseRoute = 'https://api.spotify.com/v1';
const authBaseRoute = 'https://accounts.spotify.com';
const basicAuth = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

const makeRequestParams = (user, method, endpoint, query) => ({
  method,
  url: `${apiBaseRoute}${endpoint}`,
  params: query,
  headers: { Authorization: `Bearer ${user.payload.accessToken}` },
});

const refresh = (user, method, endpoint, query) =>
  axios({
    method: 'post',
    url: `${authBaseRoute}/api/token`,
    headers: { Authorization: `Basic ${basicAuth}` },
    data: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: user.payload.refreshToken,
    }),
  })
  .then((newTokens) => {
    const { payload } = user;
    payload.accessToken = newTokens.data.access_token;

    if (newTokens.data.refresh_token) {
      payload.refreshToken = newTokens.data.refresh_token;
    }

    db.User.update({ payload }, { where: { id: user.id } });

    return user;
  })
  .then(newUser => axios(makeRequestParams(newUser, method, endpoint, query)))
  .catch((err) => { throw err; });

/**
 * Makes a request to the spotify API on behalf of the user
 * @param {Object} user     - The user's session object (req.user)
 * @param {String} method   - The HTTP method to use for the request (lowercase)
 * @param {String} endpoint - The endpoint of Spotify's API to hit (after /v1) ex: /me
 * @param {Object} query    - Query parameters to be encoded format: {key: value}
 */
module.exports = (user, method, endpoint, query) =>
  axios(makeRequestParams(user, method, endpoint, query))
    .catch((err) => {
      if (err.response.status === 401) {
        return refresh(user, method, endpoint, query);
      }
      throw err;
    });
