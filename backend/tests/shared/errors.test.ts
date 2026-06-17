import { describe, it, expect } from 'vitest'
import { AppError } from '../../src/shared/errors'

describe('AppError', () => {
  it('should create an error with code, message and httpStatus', () => {
    const error = new AppError('NOT_FOUND', 'Resource not found', 404)
    expect(error.code).toBe('NOT_FOUND')
    expect(error.message).toBe('Resource not found')
    expect(error.httpStatus).toBe(404)
  })

  it('should be an instance of Error', () => {
    const error = new AppError('BAD_REQUEST', 'Bad request', 400)
    expect(error).toBeInstanceOf(Error)
  })
})
