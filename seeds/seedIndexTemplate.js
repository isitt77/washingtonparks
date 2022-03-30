const mongoose = require("mongoose");
const Park = require("../models/park");

// mongoose.connect("mongodb://localhost:27017/stateParkSite", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connect("mongodb://localhost:27017/stateParkSite")


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", () => {
    console.log("parks database connected")
})


const seedDB = async () => {
    await Park.deleteMany({})
    await Park.insertMany({

    })
}

seedDB().then(() => {
    mongoose.connection.close()
})