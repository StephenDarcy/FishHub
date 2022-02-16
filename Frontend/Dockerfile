FROM node

RUN mkdir -p /srv/app/fishhub-frontend
WORKDIR /srv/app/fishhub-frontend

COPY package.json /srv/app/fishhub-frontend
COPY package-lock.json /srv/app/fishhub-frontend

RUN npm install

COPY . /srv/app/fishhub-frontend

CMD [ "npm", "start" ]