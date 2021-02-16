FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ../client .

CMD ["npm", "start"]