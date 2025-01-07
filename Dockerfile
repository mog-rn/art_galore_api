FROM ubuntu:latest
LABEL authors="mog-rn"

ENTRYPOINT ["top", "-b"]

FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
# Copy prisma schema
COPY prisma/schema.prisma /app/prisma/schema.prisma

# Generate Prisma Client
RUN pnpm run generate

RUN pnpm run build

EXPOSE 8080
CMD ["npm", "start:prod"]