FROM node:6.11.0-alpine

ENV NODE_ENV production

COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock
RUN cd /code && yarn install

COPY . /code
WORKDIR /code

RUN yarn run build

CMD ["sh", "./scripts/server.sh"]
