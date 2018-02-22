FROM node:boron

ENV PORT 3000
EXPOSE  3000

WORKDIR /usr/src/app

COPY package.json .
 
RUN npm install

COPY . .

CMD [ "node", "server.js" ]
