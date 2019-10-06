FROM node:8

WORKDIR /ns-games-spreadsheet
COPY ./tsconfig.json .
COPY ./package*.json ./
COPY ./scripts/fetch_ns_games_from_google_sheets.ts ./scripts/
COPY ./declarations ./declarations
COPY ./api ./api

RUN npm i
RUN npx tsc

ENTRYPOINT ["node", "dist/scripts/fetch_ns_games_from_google_sheets.js"]
