//https://vast-hare-panama-hat.cyclic.app
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const { ServerCapabilities } = require("mongodb");
var app = express();
var services = require('./final.js')
//update
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/finalViews/home.html')
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + '/finalViews/register.html')
})

app.post("/register", (req, res) => {
    services.register(req.body).then((user) => {res.send(user.email + "Registered")}).catch((err) => {res.send(err)})
})

app.get("/signIn", (req,res) => {
    res.sendFile(__dirname + '/finalViews/signIn.html')
})

app.post("/signIn", (res, req) => {
    services.signIn(req.body).then((user) => {
        res.send(user.email + "logged in")
    }).catch((err) => {res.send(err)})
})


services.startDB().then(app.listen(HTTP_PORT, onHttpStart)).catch((err) => console.log(err))