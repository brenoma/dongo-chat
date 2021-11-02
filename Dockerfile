FROM node:14-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@7.4.1

USER node

WORKDIR /home/node/app