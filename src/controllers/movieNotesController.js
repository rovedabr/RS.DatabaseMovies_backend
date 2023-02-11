const knex = require("../database/knex")
const AppError = require("../utils/AppError")

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