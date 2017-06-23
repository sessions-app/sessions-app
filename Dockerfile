FROM node:6.11.0-alpine

ADD . /code
WORKDIR /code
ENV NODE_ENV production

RUN npm install

CMD ["npm","start"]
