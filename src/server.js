const express = require("express")
const routes = require("./routes")
const AppError = require("./utils/AppError")

const app = express()
app.use(express.json())
app.use(routes)

app.get

const PORT = 5555;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))