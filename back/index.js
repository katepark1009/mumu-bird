const express = require('express')

const app = express()

app.get('/', (req, res) => { //프론트에서 '/'에 요청을 보내면 나오는 부분.
  res.send('Hello, server')
})

app.listen(4000, () => {
  console.log(`✨Server is running on http://localhost:4000✨`)
})