FROM node:8 as base

WORKDIR /ns-games-api
COPY package*.json ./
COPY tsconfig.json .
COPY api/ ./api
COPY declarations ./declarations
RUN npm i -SE

###
FROM base as dev
ENV RUN_ENV dev
ENTRYPOINT ["npm", "run", "start:dev"]
###
FROM base as production
ENV RUN_ENV production
RUN tsc
ENTRYPOINT ["npm", "run", "start:prod"]
