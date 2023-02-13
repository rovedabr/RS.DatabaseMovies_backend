const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    if(!name) {
      throw new AppError("Favor inserir o nome (campo obrigatório)")
    }

    response.status(201).json({ name, email, password })

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT *FROM users WHERE email = (?)", [email])

    //problema no App error abaixo, não está fazendo a comparação
    if(checkUserExists){  
      console.log(checkUserExists)
      // throw new AppError("E-mail já cadastrado!")
    }

    const hashedPassword = await hash(password, 10)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
    
    return response.status(201).json()
  }
}

module.exports = UserController