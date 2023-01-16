const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const authRouter = require("./router/Auth")


dotenv.config()
const app = express()

const connect = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo active")
    } catch (error) {
        console.log('mongo error')
    }
}

app.use(express.json())
app.use(morgan("tiny"))

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "server is running on production"
    })
})

app.use("/", authRouter)

app.listen(process.env.PORT, () => {
    connect()
    console.log(`server is running on port ${process.env.PORT}`)
})