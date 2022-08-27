import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:8686/api/v1/auth/signin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        is_success: true,
        message: 'ok',
      })
    )
  }),
  rest.get('http://localhost:8686/api/v1/auth/signin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        is_success: true,
        message: 'ok',
      })
    )
  }),
  rest.get('http://localhost:8686/api/v1/sample', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, title: 'hoge', body: 'fuga' }])
    )
  }),
]
