const express = require("express");
const bodyParser = require("body-parser");
const  mongoose = require("mongoose");
const date = require(__dirname + "/dateModule.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology:true});
const homeItemsSchema = mongoose.Schema({
    itemName: String
});

const workItemsSchema = mongoose.Schema({
    itemName: String
})

const HomeItem = mongoose.model("HomeItem", homeItemsSchema);
const workItem = mongoose.model("Workitem", workItemsSchema);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    HomeItem.find({}, function(err,items){
        if(err){
            console.log(err);
        }else{
            res.render("index", {dayName: dayFormat, title: "Home", listItems : items, listName:"home", otherlist: "Work"});
        }
    });

    const dayFormat = date.getShortDate();
})

app.get("/work", function(req, res){

    workItem.find({}, function(err, items){
        if(!err){
        res.render("index", {dayName: dayFormat, title: "Work", listItems : items , listName: "work", otherlist: "Home"});
        }  
    })
    const dayFormat = date.getFullDate();

})

app.get("/about", function(req, res){
    res.render("about");
  });

app.post("/", function(req, res){
    const userItem = req.body.todo;
    if(req.body.button === "home"){
        const newItem = new HomeItem({
            itemName: userItem
        });
        newItem.save();
        res.redirect("/");
    }
    else{
        const newItem = new workItem({
            itemName: userItem
        });
        newItem.save();
        res.redirect("/work");
    }    
})

app.post("/delete", function(req, res){
    const listName = req.body.list;
    const checkedItemId = req.body.checkbox;

    if(listName === "Home"){
        HomeItem.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                console.log("success");
                res.redirect("/");
            } 
        });
    } else{
        workItem.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                console.log("success");
                res.redirect("/work");
            }
    })
}
});
  
app.listen(4040, function(){
    console.log("server running at port 4040");
})