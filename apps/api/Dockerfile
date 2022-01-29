# stage 1 - build backend
FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN apk add -q --update \
  && apk add -q --no-cache ca-certificates \
  && apk add -q --no-cache --virtual .build-deps curl bash make gcc g++ python3 \
  && curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin \
  && yarn global add nx \
  && yarn --frozen-lockfile

RUN yarn build:all \
  && npm prune --production \
  && /usr/local/bin/node-prune

# stage 2 - build final image
FROM node:lts-alpine

LABEL maintainer="majesnix <majesnix@majesnix.org>"

WORKDIR /app

COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/dist/apps/majesdash ./client
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3333

CMD ["node", "main.js"]
