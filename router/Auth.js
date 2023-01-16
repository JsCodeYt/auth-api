const router = require("express").Router()
const User = require("../models/Auth")

router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        if (newUser) {
            res.status(201).json(newUser)
        } else return res.status(400).json({ error: "create error" })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username } = req.body
        const findingUser = await User.findOne({ username })
        if (findingUser) {
            if (findingUser.password === req.body.password) {
                return res.status(200).json(findingUser)
            } else return res.status(403).json({ message: "parol noto'g'ri !" })
        } else return res.status(404).json({ message: "Bunday foydalanuvchi mavjud emas !" })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({ message: "User malumotlar bazasizdan o'chirildi !" })
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router