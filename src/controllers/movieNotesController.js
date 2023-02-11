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

    var movieData = movieNotes.map(() => {
      return {
        title,
        description,
        rating,
        user_id,
        tagName, 
        // movieNotes_id : id //ver aqui - o nome da coluna id éw diferente da coluna moviesNotes_id, ver como relacionar
      }
    })

    // const tagNameInsert = movieData.map(() => {
    //   return {
    //     id,
    //     user_id,
    //     tagName
    //   }
    //   console.log(movieData)
      console.log(movieNotes)
      console.log(user_id)
      console.log(tagName)
      // console.log(movieNotes_id)

      const movieTagsInsert = movieData.map(() => {
        return {
          id,
          // movieNotes_id,
          user_id,
          tagName
        }
      })

    await knex("movieTags").insert(movieTagsInsert)

    response.json() 

  }
}

module.exports = movieNotesController