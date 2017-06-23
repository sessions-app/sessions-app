#!/bin/bash

docker-compose up -d

if [ "$1" = "logs" ]; then
  docker-compose logs -f
fi
