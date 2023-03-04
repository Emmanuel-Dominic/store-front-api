# Storefront Backend Project

## Getting Started

An online store to make the client's great product ideas available for purchase.
This project is built using basic Node and Express to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root while you have node installed on you system.

## Steps to Completion

### 1.  DB Creation and Migrations

Install postgres with guide by following this [link](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/) e.g. Below are my person provisions.

- [x] Server `localhost`
- [x] Database for running application `storefrontapi` then testing `storefrontapitest`
- [x] Port `5432`
- [x] Username `postgres`
- [x] Password for user postgres is `postgres`

Postgres commands to keep note of:

- \list or \l: list all databases
- \c db_name: connect to a certain database
- \dt: list all tables in the current database using your search_path
- \dt *.: list all tables in the current database regardless your search_path

To create database and user with a given privillages you can run:

- Create the database (change database_name)
`CREATE DATABASE database_name;`
- Create user (change my_username and my_password)
`CREATE USER my_username WITH PASSWORD 'my_password';`
- Grant privileges on database to user
`GRANT ALL PRIVILEGES ON DATABASE "database_name" to my_username;`

To use `db-migrate` or run migrations using `db-migrate up` you need to install it globally with:

- `npm install -g db-migrate`

### 2.  Other requirements

create .env file with the environmental variables listed in the `.env.example`

Run `npm i` to install the project packages listed in the package.json file

## Author

[Matembu Emmanuel Dominic](https://github.com/Emmanuel-Dominic)
