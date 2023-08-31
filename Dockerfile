FROM node:20-alpine AS development

WORKDIR /usr/src/angular

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:alpine as production

WORKDIR /usr/src/angular

COPY package*.json ./

RUN npm install --force

COPY . .

WORKDIR /usr/src/angular/dist/frontend

CMD ["npx", "http-server", "-p", "4200", "-y"]