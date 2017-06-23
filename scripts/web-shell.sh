#!/bin/bash

CONTAINER=$(docker ps -a | grep sessionsapp_web_1 | awk '{print $1}')

docker exec -it $CONTAINER sh
