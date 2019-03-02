# radar-infrastructure

Repository for radar-demo infrastructur: init project locally and run in docker.

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