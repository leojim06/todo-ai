import { describe, it, expect } from 'vitest'
import express from 'express'
import request from 'supertest'
import { AppError } from '../../src/shared/errors'
import { errorHandler } from '../../src/shared/error-handler'

describe('Error Handler Integration', () => {
  it('should catch AppError thrown in a route and return formatted response', async () => {
    const app = express()
    app.get('/test-error', (_req, _res, next) => {
      next(new AppError('TEST_ERROR', 'This is a test error', 422))
    })
    app.use(errorHandler)

    const res = await request(app).get('/test-error')
    expect(res.status).toBe(422)
    expect(res.body).toEqual({
      success: false,
      error: { code: 'TEST_ERROR', message: 'This is a test error' }
    })
  })

  it('should catch unknown errors and return 500', async () => {
    const app = express()
    app.get('/test-error', () => {
      throw new Error('Unexpected failure')
    })
    app.use(errorHandler)

    const res = await request(app).get('/test-error')
    expect(res.status).toBe(500)
    expect(res.body).toEqual({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' }
    })
  })
})
