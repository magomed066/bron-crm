import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import colors from 'colors'
import cors from 'cors'
import db from './config/db.js'
import './connections/index.js'
import {
  authRouter,
  branchRouter,
  categoryRouter,
  servicesRouter,
  materialRouter,
  orderRouter
} from './routes/index.js'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/branches', branchRouter)
app.use('/api/orders', orderRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/materials', materialRouter)
app.use('/api/services', servicesRouter)

app.get('/', (req, res) => {
  res.send(`<h1>Server is running on port: ${PORT}</h1>`)
})

db.sync()
  .then(() => {
    console.log(colors.bgGreen('Connected to the DB...'))

    app.listen(PORT, () => {
      console.log(
        `Server has been started on port ${colors.bgBlue(
          `http://localhost:${PORT}`
        )}`
      )
    })
  })
  .catch((err) => {
    console.log(err)
  })
