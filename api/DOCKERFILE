FROM node:21

WORKDIR /usr/src/app
COPY package*.json ./
COPY *.png ./
RUN npm install
COPY . .

EXPOSE 80

CMD [ "node", "--env-file=.env", "app.js", "port=80" ]