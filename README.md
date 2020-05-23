# REST-API-for-Books-NodeJS
A REST API that lets you post, delete, update and view books from a local database


This is a simple REST api that allows a user to view all books present in a local mongo database. The details of the books include name,
genre, author and read (boolean). The API also has HATEOAS i.e. each book contains links that help to navigate the API.

You can:
- View the list of all books
- View an individual book and its details

Runs on port 4000. Root link is `localhost:4000/api/books`

## Inorder to Run:

Note: You need to have nodemon installed. To install nodemon open terminal and run `npm install nodemon`

- Navigate to root folder
- `npm install`
- `npm start` OR `nodemon app`
