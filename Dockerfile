FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build
RUN node scripts/zip.js

EXPOSE 8080
CMD node scripts/http-server.js