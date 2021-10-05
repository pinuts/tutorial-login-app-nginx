PROXY_PORT := 8081

OS := $(shell uname)
UM_URL ?= http://localhost:8080

UM_APP_DIR := "um/cmsbs-conf/cse/plugins/de.pinuts.servicedesk"
PWD := $(shell pwd)
OSR := $(shell uname -r)

ifeq ($(OS),Linux)
	ifeq ($(OSR),5.4.72-microsoft-standard-WSL2)
		# wsl2:
		IP4 ?=$(shell ip -o -4 addr list eth0 | awk '{print $$4}' | cut -d/ -f1)
		DOCKER_OPTIONS := -p 8081:8081
        UM_URL := http://$(IP4):8080
    else
    	# Linux:
		DOCKER_OPTIONS := --network=host
	endif
else
	# Darwin = Mac:
	#  UM_URL muss sinnvoll gesetzt sein!
	DOCKER_OPTIONS := -p 8081:8081
	UM_URL := http://host.docker.internal:8080
endif

proxy:
	docker run --rm \
        -v $(PWD)/.nginx-proxy.conf:/.nginx-proxy.conf:ro \
        --env UM_URL=$(UM_URL) \
        --env REACT_URL=$(REACT_URL) \
        --env PROXY_PORT=$(PROXY_PORT) \
		$(DOCKER_OPTIONS) \
		nginx \
        bash -c "envsubst '\$$UM_URL \$$PROXY_PORT' < /.nginx-proxy.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"

.PHONY:	proxy
