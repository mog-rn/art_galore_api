FROM ubuntu:latest AS monitor
LABEL authors="mog-rn"

ENTRYPOINT ["top", "-b"]

FROM node:latest AS app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
COPY prisma/schema.prisma /app/prisma/schema.prisma

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm run generate

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]