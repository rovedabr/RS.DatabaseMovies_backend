const express = require("express")
const app = express()
const routes = require("./routes")

const PORT = 5555;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))