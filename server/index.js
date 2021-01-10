const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const mysql= require("mysql");
const { urlencoded } = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root145",
    database:"test"   
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials:true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

//get request to select data
app.post("/api/get",(req,res) =>{
    const Name = req.body.nameUser;
    const password = req.body.password;
   
    db.query("SELECT * FROM pdotable where name=?",[Name],(err,result)=>{
        if(err){
            console.log(err);      
        }else{
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (error,response)=>{
                    if(error){
                        res.send({message: "error"});
                    }else{
                        req.session.user =result;
                        res.send({message: "success"});       
                    }
                })
            }else{
                 res.send({message: "User Not Exist !"});      
            }
        }
  }); 
});

app.get("/api/get",(req,res) =>{
    if(req.session.user){
        res.send({isAuth: true, user: req.session.user});
    } else{
        res.send({isAuth: false});
    }
});

// post request to insert data
app.post("/api/insert",(req,res) => {
      
    const Name = req.body.nameUser; 
    const Password = req.body.password;

    bcrypt.hash(Password,saltRounds,(err, hash)=>{
        if(err){
            console.log(err);
        }

        const sqlInsert= "INSERT INTO `pdotable`(`name`,`password`) VALUES(?,?)"; 
        db.query(sqlInsert,[Name , hash],(err,result)=>{
            if(err){
                res.send(err);  
            }else{
                
                res.send({message:"success"});       
            }
        }); 
    })  
});


//put request to update data
app.put("/api/update",(req,res) => {
      
    const Id = req.body.id;
    const Name = req.body.nameUser;
    const Password = req.body.password;
    
    const sqlUpdate= "UPDATE `pdotable` SET `name`=? , `password`=? WHERE `id`=?"; 
  db.query(sqlUpdate,[Name , Password, Id],(err,result)=>{
           
  }); 
});

app.listen(3001,()=>{
    console.log("running on port 3001");
});


