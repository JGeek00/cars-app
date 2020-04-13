# About Cars App

This app has been created using React.

It is an application which provices information about some cars. That data is storaged in a MongoDB database. The api is included on this repository.



## Development

### Starting the development server

```bash
npm start
```

### Backend server

The backend server code is in a separate repository. You can find it [here](https://github.com/JGeek00/cars-app-backend).

### Data examples

Data collections are storaged into /data. 

#### Importing with MongoDB Compass

Go to the database and create the collection. Then inside that, go to Collection > Import data. There, select the JSON file of that collection, and import it.

### Working with stylesheets

For this project I'm using the SASS CSS preprocessor. The SASS stylesheet is storaged into src/scss and the final CSS stylesheets are storaged into src/css.
For converting SCSS into CSS run the next command into /src folder.

```bash
sass --watch ./scss:./css
```

### Getting the production build

```bash
npm run build
```