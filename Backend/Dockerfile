FROM node

RUN mkdir -p /srv/app/fishhub-backend
WORKDIR /srv/app/fishhub-backend

COPY package.json /srv/app/fishhub-backend
COPY package-lock.json /srv/app/fishhub-backend

RUN npm install

COPY . /srv/app/fishhub-backend

CMD [ "npm", "start" ]