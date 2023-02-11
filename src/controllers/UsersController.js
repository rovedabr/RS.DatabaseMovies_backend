const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    console.log(name)
    // if(!name) {
    //   throw new AppError("Favor inserir o nome (campo obrigatório)")
    // }

    response.status(201).json({ name, email, password })

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists) {
      throw new AppError("Este e-mail já está cadastrado.")
    }

    const hashedPassword = await hash(password, 10)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
    
    return response.status(201).json()
  }
}

module.exports = UserController