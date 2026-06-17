import { describe, it, expect, vi } from 'vitest'
import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../../src/shared/errors'
import { errorHandler } from '../../src/shared/error-handler'

describe('errorHandler', () => {
  it('should return 400 with AppError format for AppError', () => {
    const err = new AppError('VALIDATION_ERROR', 'Invalid title', 400)
    const req = {} as Request
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response
    const next = vi.fn() as NextFunction

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid title' }
    })
  })

  it('should return 500 for unknown errors', () => {
    const err = new Error('Something went wrong')
    const req = {} as Request
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response
    const next = vi.fn() as NextFunction

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' }
    })
  })
})
