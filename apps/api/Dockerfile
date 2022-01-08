# stage 1 - build backend
FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl make gcc g++ python3 \
  && npm i \
  && npm i -g nx \
  && apk del .build-deps

RUN nx run-many --target=build --projects=api,majesdash --parallel=2

# stage 2 - build final image
FROM node:alpine

LABEL maintainer="majesnix <majesnix@majesnix.org>"

WORKDIR /app

COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/dist/apps/majesdash ./client
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl make gcc g++ python3 \
  && npm i --prod --ignore-scripts \
  && apk del .build-deps

EXPOSE 3333

CMD ["node", "main.js"]
