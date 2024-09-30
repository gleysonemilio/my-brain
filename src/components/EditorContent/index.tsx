'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { InitialHtml } from './initalHtml'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { BubbleMenuComponents } from './BubbleMenu'
import { FloatingMenuComponent } from './FloatingMenu'
import { common, createLowlight } from 'lowlight'
import { Color } from '@tiptap/extension-color'

import './styles.css'
import TextStyle from '@tiptap/extension-text-style'

interface ContentInterface {
  content: string
}

const Tiptap = ({ content }: ContentInterface) => {

  console.log('content', content)
  const editor = useEditor({
    extensions: [
      Color,
      StarterKit,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common)
      })
    ],
    content: content,
    editorProps: {
      attributes: { class: 'outline-none' }
    },
    onUpdate(editor) {
      // console.log('getJSON==> ', editor.editor.getJSON())
      // console.log('getHTML==> ', editor.editor.getHTML())
      // console.log('getText==> ', editor.editor.getText())
      // https://ui.shadcn.com/themes
    }
  })

  return (
    <>
      <EditorContent className="max-w-[700px] mx-auto pt-16 prose-invert prose" editor={editor} />
      {BubbleMenuComponents({ editor })}
      {FloatingMenuComponent({ editor })}
      {/* https://tiptap.dev/docs/editor/extensions/marks/link */}
    </>
  )
}
export default Tiptap
