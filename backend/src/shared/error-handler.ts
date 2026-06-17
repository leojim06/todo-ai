import type { Request, Response, NextFunction } from 'express'
import { AppError } from './errors'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.httpStatus).json({
      success: false,
      error: { code: err.code, message: err.message }
    })
    return
  }

  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Internal server error' }
  })
}
