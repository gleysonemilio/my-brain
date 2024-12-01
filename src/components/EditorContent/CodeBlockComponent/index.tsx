import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import hljs from 'highlight.js'
import React, { useEffect } from 'react'

import './CodeBlockComponent.css'

export interface CodeBlockProps {
  node: {
    attrs: {
      language: string // Linguagem padrão selecionada no bloco de código
    }
  }
  updateAttributes: (attrs: { language: string }) => void // Função para atualizar os atributos do nó
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[] // Método para listar as linguagens suportadas
      }
    }
  }
}

const CodeBlockComponent: React.FC<CodeBlockProps> = ({
  node: {
    attrs: { language: defaultLanguage }
  },
  updateAttributes,
  extension
}) => {
  useEffect(() => {
    const blocks = document.querySelectorAll('pre code')
    blocks.forEach(hljs.highlightBlock as any)
  }, [])

  return (
    <NodeViewWrapper className="code-block">
      {/* {console.log('defaultLanguage', defaultLanguage)}
      {console.log('extension', extension?.options?.lowlight.listLanguages())}

      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension?.options?.lowlight?.listLanguages()?.map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select> */}
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  )
}

export default CodeBlockComponent
