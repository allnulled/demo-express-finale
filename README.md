# demo-express-finale

Simple demonstration of an Express app using Finale-REST to generate REST endpoints from Sequelize (ORM) models.

## 1. Prerequisites

As this example is going to connect to a MySQL database, we need a valid environment for it to work.

The example uses this configurations:

```js
{
  database:   "restexample",
  user:       "root",
  password:   "toor"
}
```

The database 'restexample' should be empty.

## 2. Installation and usage

As it is only a demonstration, and there is no other purpose behind this project, we only need to download and run the example.

```bash
# Download the package from GitHub:
git clone https://github.com/allnulled/demo-express-finale

# Go to the directory:
cd demo-express-finale

# Run all the tests (it will install the dependencies automatically):
npm run test
```
