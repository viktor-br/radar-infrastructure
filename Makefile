init: clone install-npm

docker-up:
	docker-compose up -d

docker-stop:
	docker-compose stop

docker-restart:
	docker-compose stop && docker-compose up -d

clone: clone-client clone-server

clone-client:
	cd .. && git clone git@github.com:viktor-br/radar-client.git client

clone-server:
	cd .. && git clone git@github.com:viktor-br/radar-server.git server

install-npm: install-npm-client install-npm-server

install-npm-client:
	cd ../client && npm i

install-npm-server:
	cd ../client && npm i