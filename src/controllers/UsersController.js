const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body
    const database = await sqliteConnection()
    const hashedPassword = await hash(password, 10)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
    return response.status(201).json()
  }
}

module.exports = UserController