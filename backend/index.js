require('dotenv').config()
const cors = require('cors')
const express = require('express')
const apiRoutes = require('./routes')
const { connectAllDb } = require('./middleware/connectionResolver')

const app = express()
const PORT = process.env.PORT || 3001

connectAllDb()

app.use(cors())
app.use(express.json())
app.use(express.static('../platform/dist'))
app.use(apiRoutes)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`))
