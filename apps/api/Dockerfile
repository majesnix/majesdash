FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/api .
COPY ./dist/apps/majesdash ./client
ENV PORT=3333
EXPOSE ${PORT}
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express @nestjs/config better-sqlite3
CMD node ./main.js
