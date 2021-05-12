# Employee Server

> Note:
> - This app running on Node.js and postgres, so make sure your local have installed Node.js (min. v12) and postgres v13. Or you can run this command 
``` psql --version ``` and  
``` node --version ```
> - This app use nodemon, so make sure your local have installed that. if not, you can run this command to install that
```
npm i -g nodemon
```
> - You can see schema database for this app in folder assets
#
## STEP Installation

1. Clone this repository in your local

2. Create file ```.env``` and copy paste file ```.env.example``` into it. Change value for ```DB_USERNAME_DEVELOPMENT, DB_PASSWORD_DEVELOPMENT, DB_USERNAME_TEST, DB_PASSWORD_TEST ``` according to your local postgres.

3. Default this app running on port 3000, so make sure there are not other server running on that port. Or you feel free to change value ```PORT``` in file .env.

4. run this command to install package and create database (with migration table) to your local
```
  npm i && npm run db:create:dev && npm run db:migrate:dev && npm run db:seed:dev
```
5. run this command to running app
```
  npm run dev
```
#

## API DOC
> documentation from Postman

<a href="https://documenter.getpostman.com/view/13589386/TzRUAmtV"> Link API Documentation</a>
