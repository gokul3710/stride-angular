FROM node:14-slim AS development

WORKDIR /usr/src/stride

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:14-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/stride

COPY package*.json ./

RUN npm install --omit=dev --force \
    && npm cache clean --force \
    && rm -rf /tmp/* /var/cache/apk/* /root/.npm

COPY . .

WORKDIR /usr/src/stride/dist/frontend

EXPOSE 4200

CMD ["npx", "http-server", "-p", "4200", "-y", "-d", "false"]
