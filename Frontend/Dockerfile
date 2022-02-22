FROM node:16-alpine

RUN mkdir -p /srv/app/fishhub-frontend
WORKDIR /srv/app/fishhub-frontend

COPY package.json /srv/app/fishhub-frontend
COPY package-lock.json /srv/app/fishhub-frontend

RUN npm install --silent

COPY . /srv/app/fishhub-frontend

EXPOSE 3000

CMD [ "npm", "start" ]