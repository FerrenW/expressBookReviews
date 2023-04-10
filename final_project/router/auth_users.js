const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    return username.lenght > 0
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }else
    return res.status(200).send("User successfully logged in");
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const reviewText = req.body.review;
  if (!reviewText) {
    return res.status(404).json({message: "Missing review text"});
  }

  const reviews = books[isbn].reviews;
  let userReview = reviews[username];
  if (userReview) {
    reviews[username] = reviewText;
    return res.status(200).send("Review successfully updated.");
  } else {
    reviews[username] =  reviewText;
    return res.status(200).send("Review successfully created.");
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
