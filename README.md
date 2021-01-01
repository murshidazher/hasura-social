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
  - [Hasura Console](#hasura-console)
  - [Queries / Mutations / Real-time Subscriptions](#queries--mutations--real-time-subscriptions)
    - [Creating Table](#creating-table)
  - [Sorting](#sorting)
    - [Data Filtering](#data-filtering)
    - [Full-Text Searching](#full-text-searching)
    - [Combine Multiple Filters](#combine-multiple-filters)
    - [Pagination](#pagination)
    - [Relationship between Tables](#relationship-between-tables)
    - [Mutations](#mutations)
      - [Create an Item](#create-an-item)
      - [Delete an Item](#delete-an-item)
    - [Variables in GraphQL](#variables-in-graphql)
    - [Subscriptions - Realtime Queries](#subscriptions---realtime-queries)
  - [Delegation of custom logic to third party micro-services](#delegation-of-custom-logic-to-third-party-micro-services)
    - [Serverless - Firebase Cloud](#serverless---firebase-cloud)
    - [Event Triggers](#event-triggers)
    - [Sending Email](#sending-email)
    - [Actions](#actions)
    - [User Profile Action](#user-profile-action)
    - [Relationship with Actions](#relationship-with-actions)
    - [Remote Schema](#remote-schema)
  - [Authentication in Hasura](#authentication-in-hasura)
    - [Secure Hasura Endpoints](#secure-hasura-endpoints)
    - [JWT with Hasura](#jwt-with-hasura)
    - [Using Firebase Auth](#using-firebase-auth)
    - [Role-Based Access](#role-based-access)
    - [Anonymous Role](#anonymous-role)
    - [Webhook Authentication Mode](#webhook-authentication-mode)
  - [Database Migrations & Metadata](#database-migrations--metadata)
    - [Hasura CLI](#hasura-cli)
  - [File uploading & Small Improvements](#file-uploading--small-improvements)
  - [Links](#links)
  - [License](#license)

## Installing / Getting started

A quick introduction of the minimal setup you need to get up & running. Follow [this link](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html) to install hasura it on your OS.


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
- Go to the Storage page and copy your path to backet and in `config.json` replace value of "STORAGE_BUCKET" with yours. HINT! It starts with: `gs://`.

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

> Basic information and initial setup
  
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

## Hasura Console

- Its the playground we will be working with the api, its like a light-weight version of POSTMAN. We can add headers like authentication and more.
- Explore - toggles queries and mutations docs.
- Code Exporter - used for exporting 
- Voyager - a tool which represents any graphql api as an interactive graph.
- Derive actions - it will help us with the code generations with hasura actions.
- Analyse - this will show how hasura translates graphql queries to SQL queries.

## Queries / Mutations / Real-time Subscriptions

### Creating Table

- Go to the Console > Data > 
- Give a table name of `photos`
- Columns `id`, `UUID`, generated by this function `gen_random_uuid()`
- give more columns of your liking
- Comment: a short desc about the table which will appear in the graphql docs > Add table.
- `phots` - has sorting and filtering capabilities while `photos_aggregate` has sorting and filtering capabilities with additional aggregation functionalities like count, max, min and more. `photos_by_pk` to fetch an entity by the primary key one value object or null.
- Example query would be:
  
```
query GetPhotos {
    photos {
        id
        photo_url
        description
        created_at
    }
    photos_aggregate {
        aggregate {
            count
        }
    }
}
```

## Sorting
> `asc_nulls_first / last` will put the null values at the bottom/top of the result. `distinction_on` will remove duplicates

```
query GetPhotos {
    photos(distinct_on: created_at, order_by: {created_at: desc}) {
        id
        photo_url
        description
        created_at
    }
}
```

### Data Filtering
> `{_in: ["a", "b"]}` used to filter an array of values

```
query GetPhotos {
    photos(where: {created_at: {_lte: "2020-03-12:10:15:20..."}}) {
        id
        photo_url
        description
        created_at
    }
}
```

### Full-Text Searching 

> Filter using full-text search only for columns with type text. `_like`, `_similar`. `%` means any sequence of `0` or more characters. `_like` is case sensitive and use `_ilike` to use case-insensitive. `_similar` can use regex like `"%{first|second}%"` where words is first or second.

```
query GetPhotos {
    photos(where: {description: {_like: "%third%"}}) {
        id
        photo_url
        description
        created_at
    }
}
```

### Combine Multiple Filters

> we use `_and` or `_where`

```
query GetPhotos {
    photos(_and_: [{created_at: {_gt: "2020-03-12:10:15:20..."}}, {id: {_is_null: false}}]) {
        id
        photo_url
        description
        created_at
    }
}
```

### Pagination

> We can limit the number of records we fetch using the `limit`, for skip we can use the `offset`. `Offset = (PageNum - 1) * limit`

```
query GetPhotos {
    photos(limit: 2, offset: 2) {
        id
        photo_url
        description
        created_at
    }
}
```

### Relationship between Tables

- Create a `comments` table in the data tab
- In the `foreign_key` section add a foreign_key with the reference table `photo_id` and to `id`.
- This relationship will be only in database level currently, but now we need to expose that relation for hasura
- Go to Data > photos table > Relationships > Add
- Now we can fetch comments too

```
query GetPhotos {
    photos {
        id
        photo_url
        description
        created_at
        comments {
            id
            comment
            created_at
        }
    }
}
```

### Mutations
> Mutations are responsible for manipulating data like adding, updating and deleting.

To crate a mutation - In the Explorer > Bottom Dropdown > Select Mutation and Add

#### Create an Item
> `on_conflict` is what to do on insert conflict.

```
mutation insertPhoto {
    insert_photos_one(object: {photo_url: "...", description: "..."}) {
        id
        photo_url
        description
        created_at
    }
```

#### Delete an Item
> Like update we can remove by `pk` or bulk delete

```
mutation deletePhoto {
    delete_photos(where: {description: {_eq: "Marked for delete"}}) {
        returning {
            id
            photo_url
        }
        affected_rows
    }
```

### Variables in GraphQL

In the QUERY VARIABLES tab we can define the variables

```
{
    "photo_url": "https://picsum.photos/id/",
    "description": "It is a description from url"
}
```

```
mutation insertPhoto($photo_url: String!, $description: String!) {
    insert_photos_one(object: {photo_url: $photo_url, description: $description}) {
        id
        photo_url
        description
        created_at
    }
```

### Subscriptions - Realtime Queries

> Subscription are like queries, only thing we need to do is change query to subscription. This request is not destroyed, but will be listening for future changes. 

```gql
subscription GetPhotos {
    photos {
        id
        photo_url
        description
        created_at
        comments {
            id
            comment
            created_at
        }
    }
}
```

## Delegation of custom logic to third party micro-services

> Sometimes we need to extend the hasura features like

- Event triggers - used for executing some logic after data was inserted, updated or removed from the database
- Hasura Actions - used for data validations before insert to database or you need to delegate logic to some micro service which implements only `REST` interface. Can be used for fetching data from third party apis and then relate that to hasura tables.
- Remote schemas - used for when you need to delegate logic to some microservice which implements `GraphQL` interface or you need to build reference from Hasura tables to some remote GraphQL server
- Firebase Cloud Functions - to add business logic without a server

### Serverless - Firebase Cloud

- Go to Firebase Console > Create a Project 
- Go to Build > Functions
- Go to Storage > Select the near location

```
$ npm i -g firebase-tools
$ firebase login
$ firebase init # select functions and storage by pressing space and select the existing project
```

- Uncomment the handler in functions folder > index.ts
- To deploy the function,

```sh
> firebase deploy --only functions
```

### Event Triggers

Why we need it ?
- Lets say your client wants to know if some of one comments on their photos and they want an email notification for each new comment. Its just an HTTP endpoint which is created on database record CREATE, UPDATE and DELETE.

We need to configure the event on hasura side and create the business logic for sending the email.

- In the Hasura console which is running locally > Go to events tab > Click the create button
- Name: `notify_about_comment`
- Schema: public | comment
- Trigger Operation: [x] Create
- URL: we need to give the firebase url but since we are running it locally we need to give the functions local url. To see that `http://localhost:5001/hasura-social/us-central1/notifyAboutComment` change the `localhost` to `host.docker.internal`, `http://host.docker.internal:5001/hasura-social/us-central1/notifyAboutComment`. Because the docker has its own localhost so we need to point to our localhost.

```
$ cd functions
$ npm run serve # copy the local url
```

### Sending Email

> install `node-fetch` to fetch another endpoint and `nodemailer` to mail

```sh
$ cd functions
$ npm i node-fetch nodemailer @types/node-fetch @types/nodemailer
```

### Actions

> Used for connecting multiple data sources like REST APIs where you have multiple endpoints if its a microservices architecture. Then you need to have state management like redux, but hasura also has apollo client for state management now you have two sources of truth which you have to keep it in sync. We can have hasura as the front layer for those multiple api endpoints with the use of Actions.

Lets say, we need to extend our graphql hasura with a new mutation called `createUser`. And we will use the Firebase Authentication for creating the users.

> Go to the local hasura console > Actions tab > Create
> Give the name for your action in `Action definition`

```gql
type Mutation {
    # Define your action here
    create_user (credentials: SignupCredentials): User
}
```

- New types definitions

```
type User {
    id: String!
    email: String!
    displayName: String
}

input SignupCredentials {
    email:String!
    password: String!
    displayName: String!
}
```

- We created a `resolver` basically stating that we will provide you with email, password and displayname and do you own process but return the promise with id email and displayName.
- Give the url handler as `http://host.docker.internal:5001/hasura-social/us-central1/createUser`
- Save the Action
- Now we can use this like any mutations

### User Profile Action

> Go to the local hasura console > Actions tab > Create
> Give the name for your action in `Action definition`
> And give the URL

```gql
type Mutation {
    # Define your action here
    create_user (id: String!): User
}
```

- New types definitions

```
type User {
    id: String!
    email: String!
    displayName: String
}

```

### Relationship with Actions

What if we need to fetch the photos with the `user_profile` mutations ?
- Go to Data `photos` > Modify > Columns > add a new column to link photos with user `user_id` `text` do the same with the `comments` table to associate comments with firebase user id.
- Now go to `Actions` > `user_profile` > `Relationship` > `Add a realtionship`
- This is an array relationship because a profile can have many photos
- Name: `photos`
- Schema: `public`
- Reference Table: `photos`
- From: `id` To: `user_id`
- Repeat the same thing for comments

### Remote Schema

> Remote schema will stitch/merge multiple schema together and behave like one big graphql schema. This is useful when you have multiple microservice endpoint which are graphql endpoints themselves and you don't like to have multiple roundtrip to the graphql.

- apollo-server-cloud-functions is a wrapper around apollo server to host on the cloud function and useful helpers for working with apollo on cloud.
  
```sh
$ cd function
$ cd npm i apollo-server-cloud-functions
```

- Create the `userProfile` endpoint, and run the functions again `npm run serve` 
- Go to the userProfile endpoint and copy the url 
- Now, switch to the Hasura console and go to remote schemas section
- Name: `firebase_user_profile`
- URL: paste the url you copied but change the `localhost` to `host.docker.internal`
- Save
- If you change the functions schema reload the remote schema to reflect those changes.
- Go to the Data > `photos` table > Relationships > Add remote schema relationship
- Name: `firebase_user_profile`
- Select the remote schema
- Configurations: `id` `from_columns` `user_id` so that `id` would be passed as an input.

## Authentication in Hasura

### Secure Hasura Endpoints

- First we need to secure hasura endpoint inside the container
- Go to the compose file and set `HASURA_GRAPHQL_ADMIN_SECRET` and give some secret password
- Now restart the compose file `docker-compose down/up` hasura would need the admin secret password to login to the console
- Now, we will have an additional header with every request. `x-hasura-admin-secret` this takes precedence over JWT and other headers.

### JWT with Hasura

> Go to [jwt.io](https://jwt.io). For JWT to work with hasura, we need to give it an additional object in the payload and then give the secret key too.

```
{
    ...
    "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["admin"],
        "x-hasura-default-role : "admin"
    }
}
```

- This would generate the Encoded key just copy it and give it as a header in the hasura console

```
Key: Authorization | Value:Bearer <token>
```

- To activate the JWT key in hasura we need to config it in the compose file `HASURA_GRAPHQL_JWT_SECRET` and have a `json web key url`.

### Using Firebase Auth

- Create a new Action 

```gql
type Mutation {
    # Define your action here
    login (credentials: Credentials): LoginObject
}
```

- New types definitions

```
type LoginObject {
    accessToken: String!
}

input Credentials {
    email:String!
    password: String!
}
```

- Add your firebase Web API key to `config.json`, can be found in the firebase console .
- In the firebase console, enable email and password authentication.
- Now, we can go to explorer mutation and run that mutation. But you wont be able to access because the secret differs in the hasura JWT.
- To mitigate that, go to [hasura.io/jwt-config](https://hasura.io/jwt-config/), its a small util which helps to generate the key select the provider, and enter project id. Replace the secret from the docker-compose file, `HASURA_GRAPHQL_JWT_SECRET`

### Role-Based Access

- We will give role-based access to the user, go to the `Permissions` tab and create the `user` role.
- Edit the insert and select without any check and columns selected as photo_url and description.
- Then expand Column presets and select `user_id` from session varaibles and `X-Hasura-User-Id` 
- Save
- Same way give select permissions which is read operation.
- Update would be with custom check because only the owner of the photo can update it meaning userid should match
```
{
    user_id: {
        _eq: X-Haura-User-id
    }
}
```
- Post update check should be the same with custom check as pre update.
- Delete is similar to update with same custom check as post update and pre update
- Do the same thing for comments, edit they can only edit the comment body

### Anonymous Role

- Create a new role in photos table named `anonymous`
- Give select permission without any check and select all fields
- Allow tole anonymous to make aggregation queries
- We need to also tell hasura graphql about this user by adding the secret key `HASURA_GRAPHQL_UNAUTHORIZED_ROLE`.
- Give permissions to actions too, for `login` and `create_user` for anonymous users.

### Webhook Authentication Mode

- Sometimes you might need to authenticate a user based on a custom header like `secret-header` with value `trust-me`
- Hasura doesn't know how to handle it but it can delegate this request to another authority to handle. We can configure it to handle this request.
- Comment the `HASURA_GRAPHQL_JWT_SECRET` and `HASURA_GRAPHQL_UNAUTHORIZED_ROLE` and uncomment the `HASURA_GRAPHQL_AUTH_HOOK`


## Database Migrations & Metadata

> Migration is a way to restore a new hasura graphql instance to the current status.

- Migrations & meta data are responsible for creating database snapshots. Migrations are responsible for postgres database schema and each migration is represented by `up.sql` and `down.sql` yaml files. `up` for upgrading and `down` for rollback.
- Other than the database schema we have other things to track like permissions, relationships, event triggers, actions, remote schemas and more... these are covered by meta-data which is a bundle of yaml and graphql files under the `meta_data` folder.

### Hasura CLI

We can create and manage migrations using hasura cli. To install hasura cli [read this](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli) documentation.

```sh
$ npm install --global hasura-cli
$ hasura version
```

Now, in the root of the project we can run the hasura init command to 

```sh
$ hasura init # hasura-server
```

## File uploading & Small Improvements


## Links

A list of tools used to develop this project

- :zap: [hasura ORM](https://gohugo.io/) - a static-site generator
- :athletic_shoe: [apollo](https://github.com/nvm-sh/nvm#installation-and-update) - for managing the `graphql` version
- :baby_bottle: [firebase cloud functions](https://github.com/postcss/autoprefixer) - to use 
- :burrito: [docker](https://prettier.io/) - for code formatting
- :cactus: [typescript](https://github.com/aFarkas/lazysizes) - for lazy-loading of images
- :chart_with_upwards_trend: [react](https://plotly.com/javascript/) - for interactive charts
- [ethereal](http://ethereal.email/) - is a fake SMTP service, mostly aimed at Nodemailer users.

## License

[MIT](https://github.com/murshidazher/hasura-social/blob/master/LICENSE) © Murshid Azher.