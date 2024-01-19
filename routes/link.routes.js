const { Router } = require("express")
const Link = require("../models/Link")
const auth = require("../middleware/auth.middleware")
const config = require("config")

const router = Router()

router.post("/generate", async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl")
    const {} = req.body
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

module.exports = router
