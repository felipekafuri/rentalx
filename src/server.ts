import express from 'express'
import { categoriesRouter } from './modules/cars/routes/categories.routes'
import { specificationsRouter } from './modules/cars/routes/specifications.routes'

const app = express()
app.use(express.json())
app.use('/categories', categoriesRouter)
app.use('/specifications', specificationsRouter)

app.listen(3333, () => {
  console.log('Server started on http://localhost:3333')
})
