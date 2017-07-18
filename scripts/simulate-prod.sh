#!/bin/bash

if [ "$1" = "logs" ]; then
  docker-compose -f docker-compose-prod.yml up -d
  docker-compose logs -f
  exit
fi

docker-compose -f docker-compose-prod.yml "${@:1}"
