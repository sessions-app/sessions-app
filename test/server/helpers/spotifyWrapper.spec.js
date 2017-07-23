const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const Promise = require('bluebird');
const qs = require('querystring');

let spotifyWrapper;
let axiosMock;
let dbMock;
let user;

process.env.SPOTIFY_CLIENT_ID = 'SPOTIFY_CLIENT_ID';
process.env.SPOTIFY_CLIENT_SECRET = 'SPOTIFY_CLIENT_SECRET';
const basicAuth = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

const init = (authorized, refresh) => {
  axiosMock = sinon.stub();

  if (authorized) {
    axiosMock.returns(Promise.resolve('response'));
  } else {
    axiosMock.onCall(0).returns(Promise.reject({
      response: {
        status: 401,
      },
    }));

    if (refresh) {
      axiosMock.onCall(1).returns(Promise.resolve({
        data: {
          access_token: 'new access token',
        },
      }));

      axiosMock.onCall(2).returns(Promise.resolve('response'));
    }
  }

  dbMock = {
    User: {
      update: sinon.stub().returns(Promise.resolve()),
    },
  };

  spotifyWrapper = proxyquire('../../../src/server/helpers/spotifyRequest', {
    axios: axiosMock,
    '../models': dbMock,
  });

  user = {
    id: 0,
    payload: {
      accessToken: 'access token',
      refreshToken: 'refresh token',
    },
  };
};

describe('Spotify Wrapper tests', () => {
  describe('success', () => {
    beforeEach(() => init(true));

    it('completes without throwing an error', () =>
      spotifyWrapper(user, 'method', '/endpoint', {})
        .then(() => sinon.assert.pass())
        .catch(() => sinon.assert.fail()));

    it('makes the request with the proper parameters', () =>
      spotifyWrapper(user, 'method', '/endpoint', {})
        .then(() => sinon.assert.calledWith(axiosMock, {
          method: 'method',
          url: 'https://api.spotify.com/v1/endpoint',
          params: {},
          headers: { Authorization: 'Bearer access token' },
        })));

    it('returns the response to the user', () =>
      spotifyWrapper(user, 'method', '/endpoint', {})
        .then(res => expect(res).to.equal('response')));
  });

  describe('unauthorized but successfully refreshed', () => {
    beforeEach(() => init(false, true));

    it('completes without throwing an error', () =>
      spotifyWrapper(user, 'method', '/endpoint', {})
        .then(() => sinon.assert.pass())
        .catch(() => sinon.assert.fail()));

    it('makes the refresh request with the proper parameters', () =>
      spotifyWrapper(user, 'method', '/endpoint', {})
        .then(() => sinon.assert.calledWith(axiosMock, {
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          headers: { Authorization: `Basic ${basicAuth}` },
          data: qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: 'refresh token',
          }),
        })));

    it('saves the new token in the user model', () =>
      spotifyWrapper(user, 'method', '/endpoint', {})
        .then(() => sinon.assert.calledWith(dbMock.User.update, {
          payload: {
            accessToken: 'new access token',
            refreshToken: 'refresh token',
          },
        }, { where: { id: 0 } })));
  });
});
