const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/dateModule.js");

const app = express();

var items = [];
var work = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    const dayFormat = date.getShortDate();
    res.render("index", {dayName: dayFormat, title: "Home", listItems : items, listName:"home"});
})

app.get("/work", function(req, res){
    const dayFormat = date.getFullDate();
    res.render("index", {dayName: dayFormat, title: "Work", listItems : work, listName: "work"});
})

app.post("/", function(req, res){
    var item = req.body.todo;
    if(req.body.button === "home"){
        items.push(item);
        res.redirect("/");
    }
    else{
        work.push(item);
        res.redirect("/work");
    }    
})

app.listen(4040, function(){
    console.log("server running at port 4040");
})