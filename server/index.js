const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employees')

const app = express()
app.use(cors(
    {
        origin: ["https://guvi-task-frontend-seven.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect("mongodb+srv://test:test123@cluster0.bcsxex4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees => req.json(employees))
    .catch(err=>res.json(err))
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    EmployeeModel.findOne({email,password})
        .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("THe password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
        })
})

app.listen(3001,()=>{
    console.log("server is running");
})
