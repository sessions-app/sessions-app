const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const Promise = require('bluebird');
const qs = require('querystring');

let spotifyWrapper;
let axiosMock;
let dbMock;
let user;
let query;

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
    } else {
      axiosMock.onCall(1).returns(Promise.reject('err'));
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

  query = {
    key: 'value',
  };
};

describe('Spotify Wrapper tests', () => {
  describe('success', () => {
    beforeEach(() => init(true));

    it('completes without throwing an error', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.pass())
        .catch(() => sinon.assert.fail()));

    it('hits the Spotify API only once', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.calledOnce(axiosMock)));

    it('makes the request with the proper parameters', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.calledWith(axiosMock, {
          method: 'method',
          url: 'https://api.spotify.com/v1/endpoint',
          params: { key: 'value' },
          headers: { Authorization: 'Bearer access token' },
        })));

    it('returns the response to the caller', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(res => expect(res).to.equal('response')));
  });

  describe('unauthorized but successfully refreshed', () => {
    beforeEach(() => init(false, true));

    it('completes without throwing an error', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.pass())
        .catch(() => sinon.assert.fail()));

    it('hits the Spotify API three times', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.calledThrice(axiosMock)));

    it('makes the refresh request with the proper parameters', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
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
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.calledWith(dbMock.User.update, {
          payload: {
            accessToken: 'new access token',
            refreshToken: 'refresh token',
          },
        }, { where: { id: 0 } })));

    it('updates the users refresh token if it is received', () => {
      axiosMock.onCall(1).returns(Promise.resolve({
        data: {
          access_token: 'new access token',
          refresh_token: 'new refresh token',
        },
      }));

      return spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.calledWith(dbMock.User.update, {
          payload: {
            accessToken: 'new access token',
            refreshToken: 'new refresh token',
          },
        }, { where: { id: 0 } }));
    });

    it('makes the request with the refreshed token', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.calledWith(axiosMock, {
          method: 'method',
          url: 'https://api.spotify.com/v1/endpoint',
          params: { key: 'value' },
          headers: { Authorization: 'Bearer new access token' },
        })));

    it('returns the response to the caller', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(res => expect(res).to.equal('response')));
  });

  describe('unauthorized, unsuccessful refresh', () => {
    beforeEach(() => init(false, false));

    it('throws the error for the caller to handle', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .then(() => sinon.assert.fail())
        .catch(() => sinon.assert.pass()));

    it('hits the Spotify API twice', () =>
      spotifyWrapper(user, 'method', '/endpoint', query)
        .catch(() => sinon.assert.calledTwice(axiosMock)));
  });
});
