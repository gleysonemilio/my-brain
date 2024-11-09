'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { updatePageOfUser, updateSubPage } from '@/firebase/Api'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, common, createLowlight } from 'lowlight'
import { Trash } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { BubbleMenuComponents } from './BubbleMenu'
import CodeBlockComponent from './CodeBlockComponent'
import { FloatingMenuComponent } from './FloatingMenu'
import './styles.css'

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
const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const Tiptap = () => {
  const { inforPage, setPages, pages } = useAppContext()
  const [newPage, setNewPage] = useState<string>()
  const [needSave, setNeedSave] = useState<boolean>(false)

  const editor = useEditor({
    extensions: [
      Color,
      StarterKit,
      TextStyle,
      Paragraph,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent as any)
        }
      }).configure({ lowlight }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https'
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
    console.log({ ...inforPage, id: inforPage.id as string, content: newPage as string })

    if (inforPage.idUser) {
      await updatePageOfUser({
        ...inforPage,
        id: inforPage.id as string,
        content: newPage as string
      })

      setPages(
        pages.map((ele) => {
          if (ele.id === inforPage.id) {
            return { ...inforPage, content: newPage as string }
          }
          return ele
        })
      )
    }

    if (inforPage.idPage) {
      await updateSubPage({
        ...inforPage,
        id: inforPage.id as string,
        content: newPage as string
      })

      const newArray = pages.map((ele) => {
        if (ele.id === inforPage.idPage) {
          if (ele.subPages) {
            return {
              ...ele,
              subPages: ele.subPages.map((subPage: any) =>
                subPage.id === inforPage.id ? { ...inforPage, content: newPage as string } : subPage
              )
            }
          }
        }
        return ele
      })

      setPages(newArray)
    }

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
          {inforPage?.emoji || ''}
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
