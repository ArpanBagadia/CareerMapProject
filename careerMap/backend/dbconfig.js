const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://arpanbagadia:5O2vxwJVlwERdW6K@arpan.4cy9l.mongodb.net/?retryWrites=true&w=majority&appName=Arpan')

    .then(() => {
        console.log("database connect successfully")
    })
    .catch((err) => {
        console.log(err)
    })