#!/bin/bash -e

PROXY_PORT=8081
UM_URL=http://localhost:8080
OS=`uname`
PWD=`pwd`
OSR=`uname -r`
DOCKER_OPTIONS="-p 8081:8081"

if [ "$OS" == "Linux" ]; then
	if [[ "$OSR" == *"microsoft-standard-WSL2"* ]]; then
		# WSL 2:
		IP4=`ip -o -4 addr list eth0 | awk '{print $$4}' | cut -d/ -f1`
        UM_URL="http://${IP4}:8080"
    else
    	# Linux:
		DOCKER_OPTIONS="--network=host"
	fi
else
	# Darwin = Mac:
	UM_URL="http://host.docker.internal:8080"
fi

docker run --rm \
	-v ${PWD}/.nginx-proxy.conf:/.nginx-proxy.conf:ro \
	--env UM_URL=${UM_URL} \
	--env PROXY_PORT=${PROXY_PORT} \
	${DOCKER_OPTIONS} \
	nginx \
	bash -c "envsubst '\$UM_URL \$PROXY_PORT' < /.nginx-proxy.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
