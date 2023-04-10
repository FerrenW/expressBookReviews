const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) { 
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "account created"});
        } else {
          return res.status(404).json({message: "username already exists"});    
        }
      } else if (!username || !password) {
        return res.status(404).json({message: "Username or password not provided"});
      }
      return
    });

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    let { isbn } = req.params;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    let { author } = req.params;
    let libros = []
    for (let book in books){
        if (books[book].author == author){
            libros.push(books[book])
        }
    }
    res.send(libros)
    
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    let { title } = req.params;
    let libros = []
    for (let book in books){
        if (books[book].title.toLowerCase().includes(title.toLowerCase())){
            libros.push(books[book])
        }
    }
    res.send(libros)
    
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
    let { isbn } = req.params;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
