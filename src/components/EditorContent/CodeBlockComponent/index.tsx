import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

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
}) => (
  <NodeViewWrapper className="code-block">
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
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)

export default CodeBlockComponent
