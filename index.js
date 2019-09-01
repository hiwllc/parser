const express = require('express')
const stream = require('stream')
const cors = require('cors')
const inliner = require('./inliner')

const app = express()

/**
 * Allow make request with json for api.
 */
app.use(cors())
app.use(express.json())

app.post('/', (request, response) => {
  const { content, filename } = request.body

  /**
   * Create the file.
   */
  const file = inliner(filename, content)

  const contents = Buffer.from(file, 'base64')
  const readStream = new stream.PassThrough()

  readStream.end(contents)

  response.set('Content-disposition', 'attachment; filename=' + filename)
  response.set('Content-Type', 'application/force-download')
  response.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')

  readStream.pipe(response)
})

app.listen(3333, () => {
  console.log(`🚀 Ready at port 3333`)
})
