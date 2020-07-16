const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    var today = new Date();
    var Options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    }

    var dayFormat = today.toLocaleDateString("en-US", Options);
    
    res.render("index", {dayName: dayFormat, listItems : items});
})

app.post("/", function(req, res){
    var item = req.body.todo;
    items.push(item);
    res.redirect("/");
})

app.listen(4040, function(){
    console.log("server running at port 4040");
})