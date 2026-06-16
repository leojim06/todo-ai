import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('smoke', () => {
  it('vitest runs and asserts correctly', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('App module', () => {
  it('should export a React component via @/ alias', async () => {
    const AppModule = await import('@/App')
    expect(AppModule.default).toBeDefined()
    expect(typeof AppModule.default).toBe('function')
  })
})

describe('Zustand', () => {
  it('should create a store and manage state', async () => {
    const { create } = await import('zustand')
    const useStore = create<{ count: number }>(() => ({ count: 0 }))
    expect(useStore.getState().count).toBe(0)
  })
})

describe('React Hook Form', () => {
  it('should export useForm hook', async () => {
    const { useForm } = await import('react-hook-form')
    expect(useForm).toBeDefined()
    expect(typeof useForm).toBe('function')
  })
})

describe('Tailwind CSS', () => {
  it('should have tailwindcss import in index.css', () => {
    const css = readFileSync(resolve(__dirname, '../index.css'), 'utf-8')
    expect(css).toContain('tailwindcss')
  })
})

describe('Vite config', () => {
  it('should configure react and tailwindcss plugins and @/ alias', () => {
    const config = readFileSync(resolve(__dirname, '../../vite.config.ts'), 'utf-8')
    expect(config).toContain('@vitejs/plugin-react')
    expect(config).toContain('@tailwindcss/vite')
    expect(config).toContain("'@'")
    expect(config).toContain("path.resolve(__dirname, 'src')")
  })
})

describe('index.html', () => {
  it('should have root div and script pointing to main.tsx', () => {
    const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf-8')
    expect(html).toContain('<div id="root"></div>')
    expect(html).toContain('src="/src/main.tsx"')
  })
})

describe('TypeScript config', () => {
  it('should have @/ path alias in tsconfig.app.json', () => {
    const tsconfig = readFileSync(resolve(__dirname, '../../tsconfig.app.json'), 'utf-8')
    expect(tsconfig).toContain('"@/*"')
    expect(tsconfig).toContain('"src/*"')
    expect(tsconfig).toContain('"jsx": "react-jsx"')
  })
})

describe('Vitest config', () => {
  it('should have same plugins and alias as vite.config.ts', () => {
    const vitestConfig = readFileSync(resolve(__dirname, '../../vitest.config.ts'), 'utf-8')
    expect(vitestConfig).toContain('@vitejs/plugin-react')
    expect(vitestConfig).toContain('@tailwindcss/vite')
    expect(vitestConfig).toContain("'@'")
    expect(vitestConfig).toContain('environment:')
    expect(vitestConfig).toContain("'node'")
  })
})

describe('package.json', () => {
  it('should have dev, build, test, and test:watch scripts', () => {
    const pkg = readFileSync(resolve(__dirname, '../../package.json'), 'utf-8')
    const json = JSON.parse(pkg)
    expect(json.scripts.dev).toBe('vite')
    expect(json.scripts.build).toBe('tsc -b && vite build')
    expect(json.scripts.test).toBe('vitest run')
    expect(json.scripts['test:watch']).toBe('vitest')
  })
})

describe('main.tsx', () => {
  it('should import App and use createRoot', () => {
    const main = readFileSync(resolve(__dirname, '../main.tsx'), 'utf-8')
    expect(main).toContain("import App from './App.tsx'")
    expect(main).toContain('createRoot')
    expect(main).toContain('<App />')
    expect(main).toContain('StrictMode')
  })
})

describe('dependencies', () => {
  it('should have react, react-dom, zustand, react-hook-form, tailwindcss installed', () => {
    const pkg = readFileSync(resolve(__dirname, '../../package.json'), 'utf-8')
    const json = JSON.parse(pkg)
    expect(json.dependencies.react).toBeDefined()
    expect(json.dependencies['react-dom']).toBeDefined()
    expect(json.dependencies.zustand).toBeDefined()
    expect(json.dependencies['react-hook-form']).toBeDefined()
    expect(json.dependencies.tailwindcss).toBeDefined()
  })
})

describe('ESLint config', () => {
  it('should exist and configure react plugins', () => {
    const eslint = readFileSync(resolve(__dirname, '../../eslint.config.js'), 'utf-8')
    expect(eslint).toContain('react')
    expect(eslint).toContain('plugin')
  })
})

describe('root tsconfig', () => {
  it('should reference tsconfig.app.json and tsconfig.node.json', () => {
    const tsconfig = readFileSync(resolve(__dirname, '../../tsconfig.json'), 'utf-8')
    expect(tsconfig).toContain('tsconfig.app.json')
    expect(tsconfig).toContain('tsconfig.node.json')
  })
})

describe('vite-env.d.ts', () => {
  it('should exist with Vite client type reference', () => {
    const content = readFileSync(resolve(__dirname, '../vite-env.d.ts'), 'utf-8')
    expect(content).toContain('vite/client')
  })
})

describe('tsconfig.node.json', () => {
  it('should include vite.config.ts and types node', () => {
    const tsconfig = readFileSync(resolve(__dirname, '../../tsconfig.node.json'), 'utf-8')
    expect(tsconfig).toContain('vite.config.ts')
    expect(tsconfig).toContain('node')
  })
})
