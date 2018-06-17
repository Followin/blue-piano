FROM node:10.4.1

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD npm run server