import express from "express";
import path from "path";
import ejs from "ejs"
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import data from "./data.js";


const app = express()
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/")
    .get((req,res)=>{
        res.render("anasayfa.ejs")
    })
    .post((req,res)=>{
        res.redirect("/login")
    })

app.route("/login")
    .get((req,res)=>{
        res.render("login.ejs");
    })
    .post((req,res)=>{
        const {email,password} = req.body;
        (process.env.EMAIL == email && process.env.PASSWORD == password) ? res.redirect("/secret") : res.redirect("/login");
    })

app.route("/secret")
    .get((req,res)=>{
        res.send("<h1>Sırrı Öğrendin</h1>")
    })

app.route("/api")
    .get((req,res)=>{
        const apiKey = req.query.apikey;

        apiKey === process.env.APIKEY ? res.status(200).send(data) : res.status(401).json({message:"Hatalı API KEY"})
    })

app.listen("8080",function(){
    console.log("8080 portuna bağlanıldı")
});