FROM node:22.23.3-alpine
LABEL authors="chrimontoya"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "start"]
