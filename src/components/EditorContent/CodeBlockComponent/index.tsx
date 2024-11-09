import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

import './CodeBlockComponent.css'

interface NodeAttributes {
  language: string
}

interface Node {
  attrs: NodeAttributes
}

interface EditorObject {
  node: Node
  updateAttributes: (attrs: Partial<NodeAttributes>) => void 
  extension: any 
}

export default ({
  node: {
    attrs: { language: defaultLanguage }
  },
  updateAttributes,
  extension
}: EditorObject) => (
  <NodeViewWrapper className="code-block">
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={(event) => updateAttributes({ language: event.target.value })}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang: any, index: any) => (
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
