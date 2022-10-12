const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose");

const server=express()
server.use(express.json()) 
server.use(express.urlencoded())
server.use(cors())

mongoose.connect("mongodb://localhost:27017/Myauth",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=> {
    console.log("Db connected")
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User=new mongoose.model("user",userSchema);


//Routes

server.post("/login",(req,res)=>{
    const  {email , password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(user) {
          if(password===user.password) {
            res.send({message : "Log in successFull",user:user});
          }
          else {
            res.send({message:"Incorrect Password"});
          }
        }
        else {
            res.send({message:"User not Found"})
        }
    })
})

server.post("/signup",(req,res)=>{
   const  {name , email , password}=req.body;
   User.findOne({email:email},(err,user)=> {
    if(user) {
        res.send({message:"Email Already Registered"})
    }
    else {
        const user=new User({
            name,
            email,
            password
           })
           user.save(err=>{
            if(err) {
                res.send(err);
            }
            else {
                res.send({message : "SuccessFully Registered"});
            }
           })
      }
    })
 })



server.listen(9002,() =>{
    console.log("Started at port 9002");
})
