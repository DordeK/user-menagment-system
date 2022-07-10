import routes from './routes.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:3001',
  credentials :  true,
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`running on port ${port}`)
})