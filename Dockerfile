FROM node:20-slim as production

WORKDIR /usr/src/stride

COPY package*.json ./

RUN npm install --omit=dev --force

COPY . .

WORKDIR /usr/src/stride/dist/frontend

EXPOSE 4200

CMD ["npx", "http-server", "-p", "4200", "-y", "-d", "false"]
