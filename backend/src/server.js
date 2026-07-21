require('dotenv').config()
const { createApp } = require('./app')

const PORT = process.env.PORT || 4000
const app = createApp()

app.listen(PORT, () => {
  console.log(`Salud Familiar API escuchando en http://localhost:${PORT}`)
})
