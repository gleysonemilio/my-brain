'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { BubbleMenuComponents } from './BubbleMenu'
import { FloatingMenuComponent } from './FloatingMenu'
import { common, createLowlight } from 'lowlight'
import { Color } from '@tiptap/extension-color'

import './styles.css'
import TextStyle from '@tiptap/extension-text-style'
import { updatePageOfUser } from '@/firebase/Api'
import { useAppContext } from '@/app/hooks/AppContext'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EditorProps } from '@tiptap/pm/view'

const Tiptap = () => {
  const { inforPage } = useAppContext()
  const [newPage, setNewPage] = useState<string>()
  const [needSave, setNeedSave] = useState<boolean>(false)

  interface EditorInterface {
    extensions: string[]
    content: string
    editorProps: EditorProps
    onUpdate: (editor: Editor) => void
  }

  const editor: any = useEditor({
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
    onUpdate(editor) {
      setNewPage(editor.editor.getHTML())
      // console.log('getJSON==> ', editor.editor.getJSON())
      // console.log('getHTML==> ', editor.editor.getHTML())
      // console.log('getText==> ', editor.editor.getText())
    }
  })

  const UpadatePage = async () => {
    await updatePageOfUser({ ...inforPage, id: inforPage.id, content: newPage })
    setNeedSave(false)
  }

  useEffect(() => {
    if (needSave) return

    setNeedSave(true)
  }, [newPage])

  return (
    <div>
      {needSave && (
        <Alert
          style={{
            zIndex: '90'
          }}
          className="w-[200px] fixed bottom-3 right-3 flex justify-center items-center gap-1 content-between"
        >
          <div className="h-4 w-9 justify-center items-center flex">
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
      <EditorContent className="max-w-[700px] mx-auto pt-16 prose-invert prose" editor={editor} />
      {BubbleMenuComponents({ editor })}
      {FloatingMenuComponent({ editor })}
      {/* https://tiptap.dev/docs/editor/extensions/marks/link */}
    </div>
  )
}
export default Tiptap
