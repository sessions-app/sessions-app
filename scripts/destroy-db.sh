#!/bin/bash

if [ $EUID != 0 ]; then
    sudo "$0" "$@"
    exit $?
fi

CONTAINER=$(docker ps -a | grep sessionsapp_db_1 | awk '{print $1}')

if [ $CONTAINER ]; then
  docker rm $CONTAINER
fi

sudo rm -rf postgres-data/*
