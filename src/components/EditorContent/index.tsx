'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  deleterPageOfUser,
  deleterSubPage,
  sharePageWirhFriend,
  updatePageOfUser,
  updateSubPage
} from '@/firebase/Api'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, common, createLowlight } from 'lowlight'
import { Trash, Users } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { BubbleMenuComponents } from './BubbleMenu'
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
      Document,
      Color,
      TextStyle,
      Paragraph,
      TaskList,
      Highlight,
      Youtube.configure({
        controls: true,
        nocookie: true
      }),
      TaskItem.configure({
        nested: true
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common)
      }),
      StarterKit.configure({
        codeBlock: false
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https'
      }),
      Placeholder.configure({
        placeholder: `Write something, or press '/' for commmand... `,
        emptyEditorClass: 'is-editor-empty'
      })
    ],
    content: inforPage?.content,
    editorProps: {
      attributes: { class: 'outline-none', spellcheck: 'false' }
    },
    onUpdate(editor: EditorInstance) {
      setNewPage(editor.editor.getHTML())
      // console.log('getJSON==> ', editor.editor.getJSON());
      // console.log('getHTML==> ', editor.editor.getHTML());
      // console.log('getText==> ', editor.editor.getText());
    }
  } as EditorOptions)

  const upadatePage = async () => {
    if (inforPage.idUser) {
      await updatePageOfUser({
        ...inforPage,
        id: inforPage.id as string,
        content: newPage as string
      })

      setPages(
        pages.map((ele) =>
          ele.id === inforPage.id ? { ...inforPage, content: newPage as string } : ele
        )
      )
    }

    if (inforPage.idPage) {
      await updateSubPage({
        ...inforPage,
        id: inforPage.id as string,
        content: newPage as string
      })

      const newArray = pages.map((ele) =>
        ele.id === inforPage.idPage && ele.subPages
          ? {
              ...ele,
              subPages: ele.subPages.map((subPage: any) =>
                subPage.id === inforPage.id ? { ...inforPage, content: newPage as string } : subPage
              )
            }
          : ele
      )

      setPages(newArray)
    }

    setNeedSave(false)
  }

  const deletePageOfUser = async () => {
    if (inforPage.idPage) {
      return await deleterSubPage(inforPage.id as string)
    }
    await deleterPageOfUser(inforPage.id as string)

    const newArray = pages.filter((element) => element.id !== inforPage.id)

    return setPages(newArray)
  }

  const ModalOpenDeletePage = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="secondary">
            <Trash color="#7b7b81" width={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete the page '{inforPage.title}' ? 😭
            </AlertDialogTitle>
            <AlertDialogDescription>
              This page will be permanently deleted if you click yes
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogCancel className="w-full">No</AlertDialogCancel>
            <AlertDialogAction className="w-full" onClick={deletePageOfUser}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  useEffect(() => {
    if (typeof newPage === 'undefined') return

    setNeedSave(true)
  }, [newPage])

  return (
    <div>
      <div className="h-20 rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-2xl">
        <h1 className="absolute top-28 space-x-2 font-mono text-5xl uppercase">
          {inforPage?.emoji || ''}
          {inforPage.title}
        </h1>

        <div className="flex gap-1 absolute right-6 top-28">
          <ModalOpenDeletePage />
        </div>
      </div>

      <EditorContent className="prose prose-invert mx-auto max-w-[700px] pt-16" editor={editor} />
      <BubbleMenuComponents editor={editor} />
      <FloatingMenuComponent editor={editor} />

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
            <Button size="sm" onClick={() => upadatePage()}>
              Save
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
export default Tiptap
