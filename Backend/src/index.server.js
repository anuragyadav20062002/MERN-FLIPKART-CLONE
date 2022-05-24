const express = require("express")
const env = require("dotenv")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")

//enviornment variable

env.config()

//mongodb connection

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.USER_PASSWORD}@cluster0.at6b2.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected")
  })
//

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello from server",
  })
})
app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body,
  })
})

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`)
})
