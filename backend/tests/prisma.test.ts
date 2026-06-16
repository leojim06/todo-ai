import { describe, it, expect } from 'vitest'
import { prisma } from '../src/shared/prisma'

describe('Prisma schema', () => {
  it('should have a Todo model with expected fields', async () => {
    const result = await prisma.$queryRawUnsafe<{ name: string }[]>(
      `SELECT name FROM pragma_table_info('Todo') ORDER BY cid`
    )
    const columns = result.map((r: { name: string }) => r.name)
    expect(columns).toContain('id')
    expect(columns).toContain('title')
    expect(columns).toContain('completed')
    expect(columns).toContain('createdAt')
    expect(columns).toContain('updatedAt')
  })
})
