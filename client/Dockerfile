FROM node:14

WORKDIR /app

COPY public /app
COPY src /app
COPY package.json /app

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]