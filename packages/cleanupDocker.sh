#!/bin/bash
docker stop  $(docker ps -aq)
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -q | head -n 1)
docker volume prune
docker network prune