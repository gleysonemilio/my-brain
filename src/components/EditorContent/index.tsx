'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { BubbleMenuComponents } from './BubbleMenu'
import { FloatingMenuComponent } from './FloatingMenu'
import { common, createLowlight } from 'lowlight'
import { Color } from '@tiptap/extension-color'

import TextStyle from '@tiptap/extension-text-style'
import { updatePageOfUser } from '@/firebase/Api'
import { useAppContext } from '@/app/hooks/AppContext'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import './styles.css'
import { Trash } from 'lucide-react'

interface EditorInstance {
  editor: {
    getHTML: () => string
    getJSON?: () => Record<string, any>
    getText?: () => string
  }
}

interface EditorOptions {
  extensions: any[] // Tipar corretamente conforme suas extensões (Color, StarterKit, etc.)
  content?: string | null // O conteúdo pode ser string ou null
  editorProps?: {
    attributes?: Record<string, string> // Tipagem para os atributos do editor
  }
  onUpdate?: (editor: EditorInstance) => void // Tipagem para o callback onUpdate
}

const Tiptap = () => {
  const { inforPage, setPages, pages } = useAppContext()
  const [newPage, setNewPage] = useState<string>()
  const [needSave, setNeedSave] = useState<boolean>(false)

  const editor = useEditor({
    extensions: [
      Color,
      StarterKit,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common)
      })
    ],
    content: inforPage?.content,
    editorProps: {
      attributes: { class: 'outline-none' }
    },
    onUpdate(editor: EditorInstance) {
      setNewPage(editor.editor.getHTML())
      // console.log('getJSON==> ', editor.editor.getJSON());
      // console.log('getHTML==> ', editor.editor.getHTML());
      // console.log('getText==> ', editor.editor.getText());
    }
  } as EditorOptions)

  const UpadatePage = async () => {
    await updatePageOfUser({ ...inforPage, id: inforPage.id as string, content: newPage as string })

    setPages(
      pages.map((ele) => {
        if (ele.id === inforPage.id) {
          return { ...inforPage, content: newPage as string }
        }
        return ele
      })
    )
    setNeedSave(false)
  }

  useEffect(() => {
    if (needSave) return

    setNeedSave(true)
  }, [newPage])

  return (
    <div>
      <div className="h-20 rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-2xl">
        <h1 className="absolute top-28 space-x-2 font-mono text-5xl uppercase">
          {inforPage.title}
        </h1>
        <Button variant="secondary" className="absolute right-6 top-28 p-5">
          <Trash color="#7b7b81" width={16} />
        </Button>
      </div>

      <EditorContent className="prose prose-invert mx-auto max-w-[700px] pt-16" editor={editor} />
      {BubbleMenuComponents({ editor })}
      {FloatingMenuComponent({ editor })}
      {/* https://tiptap.dev/docs/editor/extensions/marks/link */}

      {needSave && (
        <Alert
          style={{
            zIndex: '90'
          }}
          className="fixed bottom-3 right-3 flex w-[250px] content-between items-center justify-center gap-1"
        >
          <div className="flex h-4 w-9 items-center justify-center">
            <span className="text-2xl">😬</span>
          </div>
          <AlertTitle>Your page is not saved!</AlertTitle>
          <AlertDescription>
            <Button size="sm" onClick={() => UpadatePage()}>
              Save
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
export default Tiptap
