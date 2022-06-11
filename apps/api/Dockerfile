# stage 1 - build backend
FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN apk add -q --update \
  && apk add -q --no-cache ca-certificates \
  && apk add -q --no-cache --virtual .build-deps curl make gcc g++ python3 \
  && curl -sf https://gobinaries.com/tj/node-prune | sh \
  && yarn global add nx \
  && yarn --frozen-lockfile

RUN yarn build:all \
  && npm prune --omit=dev --legacy-peer-deps \
  && /usr/local/bin/node-prune

# stage 2 - build final image
FROM mhart/alpine-node:slim-16

LABEL maintainer="majesnix <majesnix@majesnix.org>"

WORKDIR /app

# upgrade packages with known vulnerabilities
RUN apk upgrade --update-cache --available && \
  apk add -q --no-cache openssl apk-tools busybox && \
  rm -rf /var/cache/apk/*

COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/dist/apps/majesdash ./client
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3333

CMD ["node", "main.js"]
