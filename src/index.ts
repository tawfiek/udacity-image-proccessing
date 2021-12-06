import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import { errorHandler, logger } from './middleware/app'
import routes from './routes'

const app = express()
const port = 3000

app.use(cors(), logger)

app.use(json({ limit: '50mb' }))
app.use(
    urlencoded({
        extended: false,
    })
)

app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
    return console.log(`server is listening on ${port}`)
})

export default app
