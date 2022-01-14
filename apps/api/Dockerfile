# stage 1 - build backend
FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN apk add -q --update \
  && apk add -q --no-cache ca-certificates \
  && apk add -q --no-cache --virtual .build-deps curl make gcc g++ python3 \
  && npm i -g --silent nx \
  && npm ci

RUN npm run build:all

# stage 2 - build final image
FROM node:lts-alpine

LABEL maintainer="majesnix <majesnix@majesnix.org>"

WORKDIR /app

COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/dist/apps/majesdash ./client
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/decorate-angular-cli.js .

RUN apk add -q --update \
  && apk add -q --no-cache ca-certificates \
  && apk add -q --no-cache --virtual .build-deps curl make gcc g++ python3 \
  && npm i -g @angular/compiler-cli \
  && npm ci \
  && apk del .build-deps

EXPOSE 3333

CMD ["node", "main.js"]
