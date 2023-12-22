const { Router } = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const config = require("config")
const User = require("../models/User")
const router = Router()

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Bad email").isEmail(),
    check("password", "minimum length of pasword can be six symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // запис помилок при валідації
      const errors = validationResult(req)

      // перевірка валідованих полів на їх наявність
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration",
        })
      }

      //отримуємо дані з фронтенда
      const { email, password } = req.body

      // шукаємо чи немає користувача з таким email
      const candidate = await User.findOne({ email })

      //якщо такий користувач є даємо статус 400 з повідомленням
      if (candidate) {
        return res.status(400).json({ message: "Such user already exists" })
      }
      //ХЕШУЄМО пароль за допомогою бібліотеки bcryptjs
      const hashedPassword = await bcrypt.hash(password, 12)
      //створюємо користувача
      const user = new User({ email, password: hashedPassword })

      //зберігаємо користувача в базу даних
      await user.save()

      //ставимо статус СТВОРЕНО з повідомленням
      res.status(201).json({ message: "User was created" })
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
)

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter a valid email").normalizeEmail().isEmail(),
    check("password", "Enter the password").exists(),
  ],
  async (req, res) => {
    try {
      // запис помилок при валідації
      const errors = validationResult(req)

      // перевірка валідованих полів на їх наявність
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during authorization",
        })
      }

      //отримуємо дані з фронтенда
      const { email, password } = req.body

      // Шукаємо користувача на наявність в базі
      const user = await User.findOne({ email })

      //Якщо користувач не знайдений, даємо статус 400 помилка автризації
      if (!user) {
        return res.status(400).json({ message: "User not found" })
      }

      // Перевіряємо співпадіння паролів
      const isMatch = await bcrypt.compare(password, user.password)

      // Якщо паролі не співпадають, даємо статус 400 помилка авторизації
      if (!isMatch) {
        return res.status(400).json({
          message:
            "The password or email address is incorrect, please try agains",
        })
      }
      // створюємо токен за допомогою бібліотеки jsonwebtoken
      const token = jwt.sign({ userId: user.id }, config.get("jwtSevret"), {
        expiresIn: "1h",
      })

      // повертаємо на фронтенд користувача з id + token
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
)

module.exports = router
