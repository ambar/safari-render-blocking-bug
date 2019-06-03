const Koa = require('koa')
const Router = require('koa-router')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const views = require('koa-views')

const app = new Koa()
const router = new Router()

app.use(conditional())
app.use(etag())

app.use(
  views(__dirname + '/views', {
    map: {
      pug: 'pug',
    },
  })
)

router.get('/', async ctx => {
  await ctx.render('home.pug', {})
})

router.get('/demo', async ctx => {
  await ctx.render('demo.pug', {query: ctx.query})
})

const delay = ms => new Promise(r => setTimeout(r, ms))

router.get('/empty.js', async ctx => {
  const networkDelay = Number(ctx.query.networkDelay)
  if (networkDelay > 0) {
    await delay(networkDelay)
  }
  ctx.body = ''
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
