# MajesDash

<p>
  <img src="https://img.shields.io/docker/v/codingbros/majesdash.svg">
  <img src="https://img.shields.io/docker/image-size/codingbros/majesdash.svg">
  <img src="https://img.shields.io/docker/pulls/codingbros/majesdash.svg">
  <a href="https://github.com/majesnix/majesdash/actions/workflows/publish.yml">
    <img src="https://github.com/majesnix/majesdash/actions/workflows/publish.yml/badge.svg">
  </a>
</p>

Todo:

- Smart tiles (stats/online check)

## Build

`npm run docker:build` will build both api and client and will also create a docker image called majesdash

## Deploy

A simple deploy could be achieved with `docker run -p 8888:3333 --env-file ./.env majesdash`.

This would deploy the dashboard to port 8888.

To persist the dashboard state, the `/app/config` path needs to be mapped somewhere. This directory will contain the sql lite database, images for tiles and user profiles/backgrounds.

## Environment

The environment variables consist of one simple variable `SECRET`, which will be used to hash passwords. This can either be set through an .env file or directly in the docker run command e.g. like this `docker run -p 8888:3333 -e SECRET=123`
