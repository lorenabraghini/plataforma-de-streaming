# Node.js Express starter application

This starter application is a simple microservice that incorporates the [Express web framework](https://expressjs.com/) to provide a landing page and two endpoints. Use this repository as a template for your own application.

A microservice is an individual component of an application that follows the **microservice architecture** - an architectural style that structures an application as a collection of loosely coupled services, each of which implements business capability. The microservice exposes a RESTful API matching a [Swagger](http://swagger.io) definition.

You can access the cloud native microservice capabilities at the following endpoints:

- The [Swagger UI](http://swagger.io/swagger-ui/) is running on: `/swagger/api-docs`
- Health endpoint: `/health`

## Before you begin

### Installing prereqs

- Prepare to run this application locally by [installing npm](https://www.npmjs.com/get-npm) and/or [installing Docker](https://docs.docker.com/get-docker/).

- If you plan to run this starter application in a container on the cloud, it's best to set up a Kubernetes cluster in advance. If you don't already have one, [set one up here](https://cloud.ibm.com/kubernetes/catalog/about).

### Using the native runtime

```bash
npm install
npm start
```

### Verifying that your local app is running

Your application is running at `http://localhost:3000`. Check the endpoints that are provided by the microservice.

## Testing your app

The starter app repo contains unit tests, functional tests, and an experience test script to check the user-facing elements (UI and endpoints) that are presented by your application. The starter app also includes a linting mechanism.

### Running tests and code coverage

To run tests and code coverage, use the following command:

```
 bash
 npm run test
```

A `coverage` folder is created with code coverage results that can be reviewed for gaps. The code coverage thresholds are also defined in `package.json` under `nyc` and can be adjusted if needed. Also, you can use the script `npm run fix` to automatically fix linting problems.
