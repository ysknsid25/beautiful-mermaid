// ============================================================================
// Browser entry point for beautiful-mermaid
//
// Exposes renderMermaid and renderMermaidAscii on window.__mermaid so they
// can be called from inline <script> tags in samples.html.
//
// Also auto-initializes Mermaid diagrams on DOMContentLoaded:
//   - <div class="mermaid">...</div>
//   - <pre><code class="language-mermaid">...</code></pre>
//
// Bundled via `bun build --target browser` in package.json.
// ============================================================================

import { renderMermaidSVGAsync } from './index.ts'
import { renderMermaidASCII, diagramColorsToAsciiTheme } from './ascii/index.ts'
import { THEMES } from './theme.ts'

declare const window: Window & typeof globalThis

;(window as Record<string, unknown>).__mermaid = {
  renderMermaidSVGAsync,
  renderMermaidASCII,
  diagramColorsToAsciiTheme,
  THEMES,
}

// Auto-initialize: find .mermaid elements and render them as SVG
async function autoInit(): Promise<void> {
  const elements = document.querySelectorAll<HTMLElement>(
    '.mermaid, code.language-mermaid'
  )

  await Promise.all(
    Array.from(elements).map(async el => {
      const code = el.textContent ?? ''
      if (!code.trim()) return

      try {
        const svg = await renderMermaidSVGAsync(code)
        const wrapper = document.createElement('div')
        wrapper.className = 'mermaid-rendered'
        wrapper.innerHTML = svg

        // <pre><code class="language-mermaid"> の場合は <pre> ごと置換
        const target =
          el.tagName === 'CODE' && el.parentElement?.tagName === 'PRE'
            ? el.parentElement
            : el
        target.replaceWith(wrapper)
      } catch (err) {
        console.error('[beautiful-mermaid] Failed to render diagram:', err)
      }
    })
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    void autoInit()
  })
} else {
  void autoInit()
}
