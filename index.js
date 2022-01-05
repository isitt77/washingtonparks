if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const methodOverride = require("method-override")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

// app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
// Connects the path to public directory
app.use(express.static(path.join(__dirname, "public")))



app.get("/", (req, res) => {
    res.render("index")
})




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Serving Washington Parks on port ${port}...`)
})