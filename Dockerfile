#Angular compile project
FROM node:lts-alpine AS compiler
WORKDIR /compiler

COPY package.json yarn.lock ./
RUN yarn CI_install

COPY . .
ARG prod
RUN if [ "$prod" = "true" ]; then yarn build-prod; else yarn build-pre; fi

#Build docker image
FROM nginx:stable-alpine
COPY --from=compiler /compiler/dist/app/ /usr/src/app
COPY --from=compiler /compiler/docker/nginx/default.conf /etc/nginx/conf.d/default.conf