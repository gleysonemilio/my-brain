'use client'

import { defaultInforPage, useAppContext } from '@/app/hooks/AppContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  deleterPageOfUser,
  deleterSubPage,
  sharePageWirhFriend,
  updateNamePage,
  updatePage
} from '@/firebase/Api'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
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
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import ImageResize from 'tiptap-extension-resize-image'

import { ModalCreateNewPage, SubPagesInterface } from '../ModalCreateNewPage'
import { ModalDeletePage } from '../ModalDeletePage'
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
  const { inforPage, setPages, pages, setInforPage } = useAppContext()
  const [newPage, setNewPage] = useState<string>()
  const [needSave, setNeedSave] = useState<boolean>(false)

  const editor = useEditor({
    extensions: [
      Color,
      Image,
      ImageResize,
      Document,
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

  const updatePageData = async (tableDb: string, id: string) => {
    await updatePage({
      ...inforPage,
      id,
      content: newPage as string,
      tableDb
    })
  }

  const upadatePage = async () => {
    try {
      if (inforPage.idUser) {
        await updatePageData('page', inforPage.id as string)

        setPages(
          pages.map((ele) =>
            ele.id === inforPage.id ? { ...inforPage, content: newPage as string } : ele
          )
        )
      }

      if (inforPage.idPage) {
        await updatePageData('sub-page', inforPage.id as string)

        const newArray = pages.map((ele) =>
          ele.id === inforPage.idPage && ele.subPages
            ? {
                ...ele,
                subPages: ele.subPages.map((subPage: any) =>
                  subPage.id === inforPage.id
                    ? { ...inforPage, content: newPage as string }
                    : subPage
                )
              }
            : ele
        )

        setPages(newArray)
      }
      toast.success('Successfully')
      setNeedSave(false)
    } catch (error) {
      toast.error('Error')
    }
  }

  const deletePageOfUser = async () => {
    try {
      if (inforPage.idPage) {
        await deleterSubPage(inforPage.id as string)

        const newArray = pages.filter((element) => {
          if (element.subPages) {
            element.subPages = element.subPages.filter(
              (ele: SubPagesInterface) => ele.id !== inforPage.id
            )
          }
          return element
        })

        toast.success('Successfully Deleted')
        setInforPage(defaultInforPage)
        return setPages(newArray)
      }
      await deleterPageOfUser(inforPage.id as string)

      const newArray = pages.filter((element) => element.id !== inforPage.id)

      setInforPage(defaultInforPage)

      toast.success('Successfully Deleted')
      return setPages(newArray)
    } catch (error) {
      toast.error('Error')
    }
  }

  const upadatePageNameTitle = async (title: string, emoji: string) => {
    try {
      await updateNamePage({
        id: inforPage.id as string,
        title,
        emoji,
        tableDb: inforPage.idPage ? 'sub-page' : 'page'
      })

      const updateFunction = (ele: any) => ({ ...ele, title, emoji })

      const updatedPages = pages.map((ele) => {
        if (inforPage.idPage && ele.id === inforPage.idPage && ele.subPages) {
          setInforPage(updateFunction(ele))
          return {
            ...ele,
            subPages: ele.subPages.map((subPage: any) =>
              subPage.id === inforPage.id ? updateFunction(subPage) : subPage
            )
          }
        }
        if (ele.id === inforPage.id) {
          setInforPage(updateFunction(ele))
          return updateFunction(ele)
        }
        return ele
      })

      setPages(updatedPages)
      return toast.success(`Successfully Updated Name ${inforPage.idPage ? 'Sub Page' : 'Page'}`)
    } catch (error) {
      toast.error('Error')
    }
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
          <ModalCreateNewPage
            isEdit
            title="Edit Name Page"
            value={{ title: inforPage.title, emoji: inforPage?.emoji }}
            ApiCreatePage={(title: string, emoji: string) => upadatePageNameTitle(title, emoji)}
          />
          <ModalDeletePage title={inforPage.title} ApiDeletePageOfUser={deletePageOfUser} />
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
