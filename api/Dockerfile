FROM node:20.17.0

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn prisma migrate

EXPOSE 8080

ENTRYPOINT ["yarn", "start:dev"]