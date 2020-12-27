## Description

    This is the first time i use NestJS framework(most of the time i use ExpressJS but i think NestJS is better for maintaining the project so i decided to use it). This submission is not meet these requirements:
    - authentication:
    - unit testing: the test cannot run due to error: controller is undefined(at this moment, i can't figure out why)

## Installation

```bash
$ npm install
$ docker pull mongo:latest
$ docker run --name mongo -p 27017:27017 -d mongo:latest
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
