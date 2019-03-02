# radar-infrastructure

Repository for running radar-demo: init project locally and run it in docker.

## Install radar-demo:
* Create folder for project and clone current repo:
```bash
mkdir radar
git clone git@github.com:viktor-br/radar-infrastructure.git
```
* clone other repos and install npm packages:
```bash
make init
```

## Running
```bash
make docker-up
```

or directly docker-compose command

```bash
docker-compose up -d
```

## Publish marker
In docker run shell script (arguments: <key> <latitude> <longitude> <description>):
```bash
scripts/publish-marker.sh me1 52.48 13.35 "Me\ 1"
```
NOTE: mind escaping of a space

Locally just run javascript file, using nodejs:
```bash
node scripts/publish-marker.js me1 52.48 13.35 "Me\ 1"
```
