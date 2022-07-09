import routes from './routes.js'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})