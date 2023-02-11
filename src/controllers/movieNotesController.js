const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class movieNotesController {
  async create(request, response) {
    const { title, description, rating, tagName } = request.body
    const { user_id } = request.params

    const movieNotes = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id
    })

    const movieRating = ["1", "2", "3", "4", "5"]
    // const checkRating = await database.get("SELECT FROM *movieNotes WHERE rating = (?)", [rating])

    console.log(rating)
    const checkRating = movieRating.find(rating => {
      if(rating === checkRating){
        console.log("teste de rating")
      }
    })
 //TENTAR USAR O FILTER AQUI

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