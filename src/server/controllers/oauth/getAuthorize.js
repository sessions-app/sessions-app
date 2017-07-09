/* eslint-disable camelcase */

const qs = require('querystring');

module.exports = (req, res, client_id) => {
  const query = {
    client_id,
    response_type: 'code',
    scope: 'user-library-modify',
  };

  res.redirect(`https://accounts.spotify.com/authorize?${qs.encode(query)}`);
};
