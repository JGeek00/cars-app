# About Cars App

This app has been created using React.

It is an application which provices information about some cars. That data is storaged in a MongoDB database. The api is included on this repository.



## Development

### Starting the development server

```bash
npm start
```

### Starting the api server

```bash
cd src/backend
node start.js
```

### Working with stylesheets

For this project I'm using the SASS CSS preprocessor. The SASS stylesheet is storaged in src/scss and the final CSS stylesheets are storaged in src/css.
For convert SCSS into CSS run the next command into /src folder.

```bash
sass --watch ./scss:./css
```

### Getting the production build

```bash
npm run build
```