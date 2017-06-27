FROM node:6.11.0-alpine

ENV NODE_ENV production

RUN yarn global add npm@5.x

COPY package.json /code/package.json
RUN cd /code && npm install

COPY . /code
WORKDIR /code

RUN npm run build

CMD ["npm","start"]
