var fs = require('fs')
const { resolve } = require('path')
var mongoose = require("mongoose");
const { mainModule } = require('process');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const { stringify } = require('querystring');

var finalUsers = new Schema({
  "email":  {
    "type": String,
    "unique": true
    },
  "password": String, 
});

module.exports. startDB = function() {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb+srv://nolan4smith:e9PXIDWl8AhRyHZx@test4school.yyakkxq.mongodb.net/?retryWrites=true&w=majority").then(() => {
            var users = mongoose.model("users", finalUsers)
            resolve("pos")
        }).catch((err) => {console.log("erorr connecting"),reject(err)})
    })
}

module.exports. register = function(user) { 
    return new Promise((resolve, reject) => {
        if(user.email == "" || user.password == "") {
            reject("Invalid Info")
        }
        bcrypt.hash(user.password, 10).then((hash) => {
            user.password = hash
            var reg = new users({
                email: user.email,
                password: user.password
            })
            reg.save().then(() => {resolve(user)}).catch(() => {console.log("User not saved")})
        }).catch(() => {reject("error hashing")})
    })

}

module.exports. signIn = function(user) {
    return new Promise((resolve, reject) => {
       users.findOne({"email" : user.email}).exec().then((pos) => {
        bcrypt.compare(user.password, pos.password).then((result) => {
            if(result) {
                resolve(user)
            }
            else {
                reject("Incorrect")
            }
        })
       }).catch(() => {
        reject(user.email +  "not found")
       })
    })
}