FROM node:16-alpine as build-stage
WORKDIR /fishhub-ui
COPY package.json .
RUN npm install 
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build
FROM nginx:alpine
COPY --from=build-stage /fishhub-ui/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE $REACT_DOCKER_PORT
CMD nginx -g 'daemon off;'