# [hasura-social](https://github.com/murshidazher/hasura-social)
> A social platform created using [Hasura GraphQL](https://hasura.io/)

- A code-base for learning hands-on about hasura graphql. This is a part repo made for demonstration.

## Table of Contents

- [hasura-social](#hasura-social)
  - [Table of Contents](#table-of-contents)
  - [Installing / Getting started](#installing--getting-started)
    - [Initial Configuration](#initial-configuration)
      - [Configure Firebase](#configure-firebase)
  - [Developing](#developing)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Deploying / Publishing](#deploying--publishing)
- [Step-by-Step Instructions](#step-by-step-instructions)
  - [Basic](#basic)
    - [What is Hasura?](#what-is-hasura)
    - [Starting with Hasura](#starting-with-hasura)
    - [Run Hasura as a Docker Container](#run-hasura-as-a-docker-container)
  - [Queries / Mutations / Real-time Subscriptions](#queries--mutations--real-time-subscriptions)
  - [Delegation of custom logic to third party micro-services](#delegation-of-custom-logic-to-third-party-micro-services)
  - [Authentication in Hasura](#authentication-in-hasura)
  - [Database Migrations & Metadata](#database-migrations--metadata)
  - [File uploading & Small Improvements](#file-uploading--small-improvements)
  - [TODO](#todo)
  - [Keep in Mind](#keep-in-mind)
  - [Links](#links)
  - [License](#license)

## Installing / Getting started

A quick introduction of the minimal setup you need to get up & running. Follow [this link](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html) to install hasura it on your OS.

```shell
packagemanager install awesome-project
awesome-project start
awesome-project "Do something!"  # prints "Nah."
```

### Initial Configuration

Basic necessity for proceeding with the development

- [node](https://nodejs.org/en/download/)
- [docker](https://docs.docker.com/get-docker/)


#### Configure Firebase

- Install Firebase Tools `npm install -g firebase-tools`
- Install npm dependencies: `cd functions && npm install`
- Go You need to login with your firebase tools. Just run `firebase login`.
- Create a project. Run: `firebase projects:create --display-name hasura-course-project`. You will be asked to give some id to the project. HINT! Use some unique prefix.
- Copy Project ID of created project and replace all strings "hasura-course" in whole files with your project id. (but exclude files: package-lock.json, README.MD). HINT! You can use global search/replace in your IDE or `CMD + Shift + f` if you use VS CODE. (Should be affected files docker-compose.yaml, actions.yaml, remote_schemas.yaml, tables.yaml). P.s it is temporary solution, very soon it will be solved with env variables.
- Set up project alias: `firebase use --add` and pick created project and give some aliase.
- Run command: `firebase open auth`. Click "Get started" and activate "Email/Password" provider.
- In Firebase console, go to "Storage" and click "Get Started" and follow instructions.
- In Code editor, go to folder `functions` and clone and rename `config.example.json` to `config.json` and `serviceAccountKey.example.json` to `serviceAccountKey.json`;
- Run `firebase open settings`. Copy WEB API KEY and paste it into config.json instead "YOUR_API_KEY"
- On the settings page, go to "Service Accounts" tab and click "Generate new private key". Open generated file, copy its content and replace content of `serviceAccountKey.json` with what you just copied.
- Go to the Storage page and copy your path to backet and in `config.json` replace value of "STORAGE_BACKET" with yours. HINT! It starts with: `gs://`.

## Developing

Here's a brief intro about what a developer must do in order to start developing the project further:

### Backend

- Run cloud functions locally. In folder `functions` run `npm run serve`

- Run docker containers. Open new terminal tab and in the project root folder execute:`docker-compose up` or `docker-compose up -d` if you want to run it as a daemon. (it may take up to 1-2 minutes)

- Open Hasura Console. Once your containers are up and running you can open another terminal tab and navigate to hasura-server folder and open your Hasura console: `cd hasura-server && hasura console`

### Frontend

```shell
cd angular-hasura-app
npm i
npm run start
```

> (Optional) if you plan to change .graphql files you should run `npm run generate-types` in separate terminal tab.

### Deploying / Publishing

In case there's some step you have to take that publishes this project to a server, this is the right time to state it.

```shell
packagemanager deploy awesome-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

# Step-by-Step Instructions

## Basic 

- Basic information and initial setup
  
### What is Hasura?

- To understand hasura, we should start with GraphQL. GraphQL is a Query Language for API and runtime for fulfilling those queries with your existing data. Hasura sits between the client and the database and allows you to dynamically generates queries based on the your database and the client request. It also access authentication, Role-based data access and business logic.

### Starting with Hasura

- Go to [hasura.io](https://hasura.io/). Click on try and Sign up for an account. Pick an existing or try a heroku account. This demonstration will use an existing heroku account to create a new database. 
- You will be redirected to the dashboard, after the project was successfully created. Env var has the `HASURA_GRAPHQL_DATABASE_URL` which is the connection to our database. Add a new env var called `HASURA_GRAPHQL_DEV_MODE` and make it `True`.
- If you press launch console, you will be redirected to the [hasura console](https://finer-eft-65.hasura.app/console).
  
### Run Hasura as a Docker Container

> Setup hasura to run on a docker container locally, since you might be changing the database schema quite often hence you don't want to break the application for your colleagues. Read [this](https://hasura.io/docs/1.0/graphql/core/getting-started/docker-simple.html#step-2-run-hasura-graphql-engine-postgres) for more information.

- Open terminal and run `docker`
- Create a project folder and create a docker-compose file.

```shell
> curl https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml -o docker-compose.yml
```

- This is same as the env var of the hasura cloud.
- Add `./` prefix for volume in order to mount database data into the current folder.
- Then run `docker-compose up` to pull the necessary images. After successfully running the docker container we can see the application in `localhost:8080`.

## Queries / Mutations / Real-time Subscriptions

## Delegation of custom logic to third party micro-services

## Authentication in Hasura

## Database Migrations & Metadata

## File uploading & Small Improvements

## TODO

- [ ] Add table of contents


## Keep in Mind

- **Syntax** - syntax highlight isn't working as it's expected to work.
- Plotly

## Links

A list of tools used to develop this project

- :zap: [hasura ORM](https://gohugo.io/) - a static-site generator
- :athletic_shoe: [apollo](https://github.com/nvm-sh/nvm#installation-and-update) - for managing the `graphql` version
- :baby_bottle: [firebase cloud functions](https://github.com/postcss/autoprefixer) - to use 
- :burrito: [docker](https://prettier.io/) - for code formatting
- :cactus: [typescript](https://github.com/aFarkas/lazysizes) - for lazy-loading of images
- :chart_with_upwards_trend: [react](https://plotly.com/javascript/) - for interactive charts

## License

[MIT](https://github.com/murshidazher/hasura-social/blob/master/LICENSE) © Murshid Azher.