FROM node:lts-alpine AS build

WORKDIR /app
COPY . .

RUN npm i && npm run build

FROM nginx:latest

COPY --from=build /app/dist/angular-pokedex /usr/share/nginx/html

EXPOSE 80