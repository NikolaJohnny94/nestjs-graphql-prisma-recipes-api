# <img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_docker_icon_130643.png' width='36'> Dockerized <img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_nestjs_icon_130355.png' width='32' style='margin-right: 2px;'/>Nest.js, <img src="https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_graphql_icon_130564.png" width='32'/> GraphQL, <img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_light_prisma_icon_130444.png' style='margin-right: 5px;' width='32px'> Prisma, <img src='https://cdn.icon-icons.com/icons2/2415/PNG/64/postgresql_original_logo_icon_146391.png' style='margin-right: 5px;' width='32px'>PostgreSQL and <img src='https://jwt.io/img/pic_logo.svg' width='26px'> JWT authentification Recipes API 🤗

## Overview 📜

The Recipes API is a server-side application built using modern, robust technologies (**Nest.js**, **GraphQL**, **Prisma**, **PostgreSQL**, and **Docker**) to provide a scalable and efficient solution for managing recipes. It offers functionality for **creating**, **reading**, **updating**, **deleting** (**CRUD**), **searching** recipes and **authentication**, with a strong emphasis on **security**, and efficient data management.

<hr/>

### 💻 Technologies used: <br/>

<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_nestjs_icon_130355.png' width='26' style='margin-right: 2px;'/>[Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Nest.js provides a modular architecture, making it easy to organize and maintain the codebase.<br/>
<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_graphql_icon_130564.png' width='26px'> [GraphQL](https://graphql.org/) - A query language and runtime for APIs that enables clients to request exactly the data they need. GraphQL provides a flexible and efficient way to interact with the API, supporting nested queries and reducing over-fetching or under-fetching of data.<br/>
<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_light_prisma_icon_130444.png' style='margin-right: 5px;' width='20px'>[Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript. Prisma provides a type-safe database client, making it easy to interact with the PostgreSQL database and ensuring data integrity.<br/>
<img src='https://cdn.icon-icons.com/icons2/2415/PNG/64/postgresql_original_logo_icon_146391.png' style='margin-right: 5px;' width='20px'>[PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system known for its reliability and performance. PostgreSQL is used to store and manage the data for the API.<br/>
<img src='https://jwt.io/img/pic_logo.svg' width='26px'> [JWT](https://jwt.io/) - A compact, URL-safe means of representing claims to be transferred between two parties. JWTs are used for securely transmitting information between parties as a JSON object, ensuring secure authentication and authorization.<br/>
<img src='https://cdn.icon-icons.com/icons2/2415/PNG/64/docker_original_wordmark_logo_icon_146557.png' width='26px'> [Docker](https://www.docker.com/) - A platform for developing, shipping, and running applications in containers. Docker enables you to package your application and its dependencies into a container, ensuring consistency across different environments.<br/>
<img src='https://cdn.icon-icons.com/icons2/2107/PNG/64/file_type_nginx_icon_130305.png' width='26px'> [nginx](https://nginx.org/en/) - A high-performance web server and reverse proxy server. Nginx is used to handle incoming traffic and distribute it to the appropriate services, improving scalability, load balancing, and security.<br/>

<hr/>

### Key Features 🔑

- **Authentication**: Secure authentication using JWT with support for signin, signup, signout, and token refresh.
- **User Management**: Users can view, update, and delete their own profiles, while public profiles display limited user details and associated recipes.
- **Recipe Management**: Users can perform CRUD operations on their own recipes, with search functionality available for both public and private recipes.
- **Guards**: Protect routes and ensure only authorized users can access specific endpoints using Auth Guard.
- **Search Functionality**: Enables public and private recipe searches by title, description, ingredients, and categories.
- **Security Features**: Implements password hashing, refresh tokens, and access token and access control to protect user data and ensure session security.
- **Database Seeding**: Populate the database with initial user and recipe data for development or testing purposes.

### Authentication & Authorization 🔏

- **Secure Authentication**: Users can register and log in to access protected endpoints.
- **JWT-based Authorization**: Ensures only authorized users can access their own recipes and profiles.

### User Management 👥

- **Profile Management**:
  - **Users** can view their own profile with details such as name and email.
  - **Users** can update their profile information, including their name and email.
  - **Users** can delete their account from the platform.
- **Public User Profiles**: Provides access to public user details such as their name and associated recipes.

### Recipe Management 📄

- **Create Recipes**: Users can create new recipes with attributes like title, description, ingredients, and categories.
- **Update Recipes**: Users can edit their own recipes.
- **Delete Recipes**: Users can remove their recipes from the database.
- **Search Recipes**: - Search through public recipes on the platform based on various fields (e.g., title, description, ingredients, categories). - Search through user-specific recipes for a personalized experience.

### Guards 🛡️

- **Auth Guard**: Ensures that only authenticated users can access protected routes by verifying the JWT token in each request.

### Search Functionality 🔎

- **Public Recipe Search**: Allows anyone to search for public recipes based on title, description, ingredients, or categories.
- **Private Recipe Search**: Authenticated users can search through their own recipes, including the ability to filter results by specific criteria such as title or ingredients.

### Security Features 👮

- **Password Hashing:** User passwords are hashed to ensure they are not stored in plain text.
- **Refresh Tokens**: Enables secure handling of session management and token refreshes.
- **Access Restrictions**: Enforced access rules to ensure users can only manage their own data.

### Database Seeding 🌱

The API includes functionality for seeding the database with initial data. This is useful for setting up a development environment or for testing purposes. The following operations are supported:

#### Seed Command:

To populate your database with initial data, use the following command:

```bash
npm run prisma:seed
```

This command will execute the seed script, allowing you to set up initial data for development or testing purposes. It will have user with email: "**_test_user@example.com_**" and password "**Test123.**" and 3 recipes. If you are running project with Docker, then this script will run on initialization and you can test the the **signIn** endoint with "**Test User**" creadentials provided above.

#### Benefits of Database Seeding:

- **Consistent Development Environment**: Ensures that all developers have the same initial data, reducing discrepancies and bugs.

- **Testing**: Provides a reliable dataset for testing, ensuring that tests are run against known data.

- **Demo Data**: Allows you to quickly set up demo data for presentations or client demonstrations

<hr/>

## Installation 🛠️

1. **Clone the repository**
   ```bash
   git clone https://github.com/NikolaJohnny94/nestjs-graphql-prisma-recipes-api.git
   cd nestjs-graphql-prisma-recipes-api
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables: Create a .env file in the root directory and add the following variables:**

   ```bash
   DATABASE_URL=your_db_url
   ```

4. **Run database migrations:**

   ```bash
   npm run prisma:migrate:dev
   ```

5. **Generate Prisma client:**

   ```bash
   npm run prisma:generate
   ```

## Run the project 🚀

**Start the application:**

```bash
npm run start:dev
```

If you run the project locally, the **API** will be available at **http://localhost:3000/graphql**

## Run the project with Docker 🐋

**Set up environment variables:**
<br/>Create a **_.env.docker.local_** file in the root directory and add the following _variables_:

```bash
POSTGRES_USER=your_db_username
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
DATABASE_URL=your_db_url
```

**Build the images:**

```bash
docker-compose --env-file .env.docker.local build
```

**Creating and starting the containers:**

```bash
docker-compose --env-file .env.docker.local up
```

If you run the project locally, the **API** will be available on **http://localhost/graphql** thanks to the [**_nginx_**](https://nginx.org/en/) that is set up as service in _docker-compose_ file. **Nginx** acts as a reverse proxy, forwarding requests from **http://localhost/** to **http://localhost/3000** running inside the **Docker** container. This setup allows you to access your **API** through a single, consistent **URL**, even if the underlying services are running on different ports.

<!-- If you run the project locally, the **API** will be available on **http://localhost/graphql** thanks to the [**_nginx_**](https://nginx.org/en/) that is set up as service in _docker-compose_ file. **Nginx** acts as a reverse proxy, forwarding requests from **_http://localhost/graphql_** to the appropriate service running inside the **Docker** container. This setup allows you to access your **API** through a single, consistent **URL**, even if the underlying services are running on different ports. -->

  <hr/>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
