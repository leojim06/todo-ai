import { describe, it, expect } from 'vitest'

describe('Backend smoke test', () => {
  it('should import the app module', async () => {
    const { app } = await import('../src/app')
    expect(app).toBeDefined()
  })
})
