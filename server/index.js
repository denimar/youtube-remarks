import 'babel-polyfill'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import ModuleRoutes from './module/ModuleRoutes'
import elasticsearch from 'elasticsearch'

const app = express()
const port = process.env.PORT || 5000

app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client')));

  // Handle React routing, return all requests to React app
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../client', 'index.html'));
  // });
}

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  
  const clientDb = new elasticsearch.Client({
    host: 'http://35.211.226.16:9200', //Kibana at: http://35.211.226.16:5601 //reference: https://www.elastic.co/assets/blt395810ab50bd150b/6.3_es_commands.txt
    //log: 'trace'
  })
  clientDb.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 10000
  }, async error => {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('Elasticsearch is running...');
    }
  })
  

  new ModuleRoutes(app, clientDb)
})
server.setTimeout(50000000);
