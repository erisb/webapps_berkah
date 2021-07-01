const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  
  server.get('/', (req, res) => {
    return app.render(req, res, '/Index', req.query)
  })

  server.get('/all_pendanaan', (req, res) => {
    return app.render(req, res, '/All_pendanaan', req.query)
  })

  server.get('/ziswaf', (req, res) => {
    return app.render(req, res, '/Ziswaf', req.query)
  })

  server.get('/about', (req, res) => {
    return app.render(req, res, '/About', req.query)
  })

  server.get('/pembayaran', (req, res) => {
    return app.render(req, res, '/Pembayaran', req.query)
  })

  server.get('/detail_pendanaan', (req, res) => {
    return app.render(req, res, '/Detail_pendanaan', req.query)
  })

  server.get('/panduan', (req, res) => {
    return app.render(req, res, '/Panduan', req.query)
  })
 
  server.get('/admin/login', (req, res) => {
    return app.render(req, res, '/admin/Login', req.query)
  })
  
  server.get('*', (req, res) => {
     return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})