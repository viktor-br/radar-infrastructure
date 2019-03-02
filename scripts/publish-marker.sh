#!/usr/bin/env bash

KEY=$1
LATITUDE=$2
LONGITUDE=$3
CONTENT=$4

docker run \
    -it --rm \
    -w /var/www \
    -v `pwd`:/var/www \
    --net infrastructure_radar \
    node:11-alpine \
    sh -c "RADAR_RABBITMQ_HOST=radar-rabbitmq node scripts/publish-marker.js ${KEY} ${LATITUDE} ${LONGITUDE} ${CONTENT}"
