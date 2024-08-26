
# School Management API

An API made using Node.js, Express.js framework, and MySQL to manage school data. The system will allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Run

To run this project run

```bash
  npm start
```



## API Reference

#### Get all items

```http
  POST /addSchool
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name of the School |
| `address` | `string` | **Required**. Address of the School |
| `latitude` | `float` | **Required**. Latitude of the School |
| `longitude` | `float` | **Required**. Longitude of the School |

#### Get item

```http
  GET /listSchool
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `latitude` | `float` | **Required**. Latitude of the user |
| `longitude`| `float` | **Required**. Longitude of the user |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`PORT`


## Run Locally

Clone the project

```bash
  git clone https://github.com/AnkitKumarMitra/school-management.git
```

Go to the project directory

```bash
  cd school-management
```
Run the SQL script to set up the database

```bash
  mysql -u <your-username> -p <your-database-name> < database.sql
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

