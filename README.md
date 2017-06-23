# Sessions App

This is the webapp and server of the sessions app.

## Dependencies

* [Docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [node v6.11.0](https://nodejs.org/en/download/)

## Running

For local development, Docker will use the `node_modules/` folder in this directory.
This is so that if you choose to install a new package, you don't have to rebuild
the image for the changes to take place. So, before anything else, run `npm i` to
pull down this project's dependencies.

Then you'll want to create a directory named `postgres-data` in the root of this
project. Docker will persist your local database across image restarts in this
directory.

You can run the app with `./scripts/start-local.sh`.

You can stop the app with `docker-compose stop`.

## Scripts

Several convenience scripts are in the `scripts` directory. They are documented
below.

* `destroy-db.sh` - will blow away the data in `postgres-data/`, as well as the
  postgres docker image.
* `web-shell.sh` - will drop you in a shell inside of the docker container where
  the code is currently running.
* `start-local.sh` - will start the app for you in the background. If you include
  `logs` as an argument (`start-local.sh logs`), you'll be shown the logs as they
  scroll by, but CTRL+C will only stop from viewing the logs, the container will
  still be running.
