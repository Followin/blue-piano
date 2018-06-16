FROM node:10.4.1

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 443
CMD npm run server