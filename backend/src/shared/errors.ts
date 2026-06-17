export class AppError extends Error {
  public readonly code: string
  public readonly httpStatus: number

  constructor(code: string, message: string, httpStatus: number) {
    super(message)
    this.code = code
    this.httpStatus = httpStatus
    this.name = 'AppError'
  }
}
