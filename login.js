
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
//const bodyParser = require("body-parser");
//const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));
app.use(express.urlencoded({
    extended: false
}));

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "10102018", // change to your mySQL password
    database: "book_schema2"
});
connection.connect(function(error){
    if (error) throw error
    else console.log("Connected Successfully!")
});
app.get("/", function(req,res){
    res.sendFile(__dirname+"/dangnhapform1.html");
})
app.post("/", (req,res) => {
 //   app.post("/",encoder,function(req,res) {
    var username=req.body.username;
    var password=req.body.password;
  
    connection.query("select * from loginuser where user_name = ? and user_pass = ? ", [username,password] ,function(error,results,fields){
        if (results.length >0) {
            res.redirect("/index");
        }
        else {
            res.redirect("/");

        }
        res.end();
    })
})
app.get("/index",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.listen(4002);