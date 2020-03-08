# dbManager

dbmanager is a web page designed for users to be able to acecess multiple mongo databases, check their collectionds and perfom CRUD operations on documents

This application has API REST to connect to a MongoDB obtaining restaurants and their details.

## Author

[Juan Diego Arango Ramos](https://github.com/juandarango98)

## Technologies used

- HTML, CSS, Bootstrap, Javascript, Node.js, Express.js, MongoDB, Mongo Atlas

## Application deployment

This application has both a front and back end, and it is necessary to have a certain setup in order to use it.

### Requirements

The web page is deployed on heroku on this link: https://dbmanagerjda.herokuapp.com , it has the global variables set so the app can access the database without having the credentials public

## Deployed Application

[Restaurants](https://dbmanagerjda.herokuapp.com)

## License

[MIT License](https://github.com/juandarango98/PARCIAL1WEB/blob/master/LICENSE)

## Creative component

The page is written almost in a 100% javascript with client side rendering (main.js) and server side rendering (Detailsutils.js), the only pure html page in the start page that has only a button and a label. Because of this, the page changes dinamically based on the choices of the user, and there is only one page were the action occours.
The page refreshes automatically on every action of the user, if a db is chosen or a collection or even if a document is created, the page re-renders automatically, no need for presing OK buttons.
