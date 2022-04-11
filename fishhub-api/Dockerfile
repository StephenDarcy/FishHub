FROM node:16-alpine
WORKDIR /fishhub-api
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]