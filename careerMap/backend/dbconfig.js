let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yashimscit:r9Zhr63BbgcDGjNQ@yash.09syy.mongodb.net/?retryWrites=true&w=majority&appName=Yash')
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Error in connected",err)
})