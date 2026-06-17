import { describe, it, expect } from 'vitest'
import type { Result } from '../../src/shared/types'

describe('Result<T>', () => {
  it('should represent a successful result with data', () => {
    const result: Result<string> = { success: true, data: 'hello' }
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toBe('hello')
    }
  })

  it('should represent a failed result with error', () => {
    const result: Result<never> = { success: false, error: { code: 'NOT_FOUND', message: 'Not found' } }
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.code).toBe('NOT_FOUND')
      expect(result.error.message).toBe('Not found')
    }
  })
})
