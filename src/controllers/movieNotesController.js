const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class movieNotesController {
  async create(request, response) {
    const { title, description, rating, tagName } = request.body
    const { user_id } = request.params

    const movieRate = Array(rating)
    const movieRates = ["1", "2", "3", "4", "5"]
    const rateOk = movieRates.some((rate) => movieRate.includes(rate))

    if(!rateOk) {
       throw new AppError("O valor de rating do filme vai de 1 a 5")
      }
    
    const movieNotes = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id
    })

    const movieTag = Array(tagName)
    const movieTagClassification = ["Ação", "Aventura", "Biográfico", "Comédia", "Fantasia", "Musical", "Ficção", "Romance", "Terror"]
    const tagOk= movieTagClassification.some((tag) => movieTag.includes(tag))

    if(!tagOk) {
      throw new AppError(" A Tag de classificação dos filmes deverá ser escolhioda entre os itens: Ação, Aventura, Biográfico, Comédia, Fantasia, Musical, Ficção, Romance, Terror")
    }

    const movieTagsInsert = movieNotes.map(() => {
      return {
        movieNotes_id: movieNotes,
        user_id,
        tagName
      }
    })

    await knex("movieTags").insert(movieTagsInsert)

    response.json() 

  }
}

module.exports = movieNotesController