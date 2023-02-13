const { hash, compare } = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    if(!name) {
      throw new AppError("Favor inserir o nome (campo obrigatório)")
    }

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT *FROM users WHERE email = (?)", [email])
    
    if(checkUserExists){  
      throw new AppError("E-mail já cadastrado!")
    }
    
    response.status(201).json({ name, email, password })
    const hashedPassword = await hash(password, 10)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
    
    return response.status(201).json()
  }

  async update (request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    console.log(user)

    // if(!user){
    //   throw new AppError("Usuário não encontrado")
    // }

    const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("este e-mail já está cadastrado!")
    }

    user.name = name ?? user.name
    user.email = email ?? user.name

    if(password && !old_password) {
      throw new AppError("Para atualziação de senha é necessário informar a senha antiga")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere")
      }

      user.password = await hash(password, 10)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    )

    return response.status(201).json()
  }
}

module.exports = UserController