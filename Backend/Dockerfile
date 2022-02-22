FROM node:16-alpine

RUN mkdir -p /srv/app/fishhub-backend
WORKDIR /srv/app/fishhub-backend

COPY package.json /srv/app/fishhub-backend
COPY package-lock.json /srv/app/fishhub-backend

RUN npm install

COPY . /srv/app/fishhub-backend

EXPOSE 8080

CMD [ "npm", "start" ]