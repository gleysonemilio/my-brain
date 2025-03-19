import { FloatingMenu } from '@tiptap/react'
import {
  Code2Icon,
  Heading1,
  Heading2,
  Heading3,
  Image,
  List,
  ListChecks,
  ListOrdered,
  Youtube
} from 'lucide-react'

interface FloatingMenuInterface {
  editor: any
}

export const FloatingMenuComponent = ({ editor }: FloatingMenuInterface) => {
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, 700) || 640,
        height: Math.max(180, 250) || 480
      })
    }
  }

  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  const floatingGoupItem = [
    {
      icon: <Heading1 color="#8d8d8d" />,
      title: 'Heading 1',
      subTitle: 'Big section heading',
      isActive: 'heading',
      ActionButton: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      icon: <Heading2 color="#8d8d8d" />,
      title: 'Heading 2',
      subTitle: 'Medium section heading',
      isActive: 'heading',
      ActionButton: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      icon: <Heading3 color="#8d8d8d" />,
      title: 'Heading 3',
      subTitle: 'Small section heading',
      isActive: 'heading',
      ActionButton: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
    },
    {
      icon: <Code2Icon color="#8d8d8d" />,
      title: 'Blockquote',
      subTitle: 'Create a simple Blockquote',
      isActive: 'blockquote',
      ActionButton: () => editor.chain().focus().setBlockquote().run()
    },
    {
      icon: <List color="#8d8d8d" />,
      title: 'Bulleted list',
      subTitle: 'Create a simple bulleted list',
      isActive: 'bulletList',
      ActionButton: () => editor.chain().focus().toggleBulletList().run()
    },
    {
      icon: <ListOrdered color="#8d8d8d" />,
      title: 'Ordered List',
      subTitle: 'Create a simple Ordered list',
      isActive: 'orderedList',
      ActionButton: () => editor.chain().focus().toggleOrderedList().run()
    },
    {
      icon: <ListChecks color="#8d8d8d" />,
      title: 'Task List',
      subTitle: 'Create a simple Task List',
      isActive: 'taskList',
      ActionButton: () => editor.chain().focus().toggleTaskList().run()
    },
    {
      icon: <Youtube color="#8d8d8d" />,
      title: 'Youtube',
      subTitle: 'Create a link Youtube',
      isActive: 'youtube',
      ActionButton: () => addYoutubeVideo()
    },
    {
      icon: <Image color="#8d8d8d" />,
      title: 'Image',
      subTitle: 'Create a link Image',
      isActive: 'image',
      ActionButton: () => addImage()
    }
  ]

  return (
    <FloatingMenu
      editor={editor}
      className="flex flex-col overflow-hidden rounded-md border border-zinc-900 bg-zinc-900 p-1 drop-shadow-[20px_20px_20px_rgba(0,0,0,0.25)]"
      shouldShow={({ state }) => {
        const { $from } = state.selection

        const currentLineText = $from.nodeBefore?.textContent

        return currentLineText === '/'
      }}
    >
      {floatingGoupItem.map(({ title, subTitle, icon, ActionButton }, index) => (
        <button
          key={index}
          onClick={() => ActionButton()}
          className="flex min-w-[280px] items-center gap-2 p-1 hover:rounded hover:bg-zinc-800"
        >
          <div className="w-12 h-12 rounded border-zinc-600 bg-zinc-100 flex justify-center items-center">
            {icon}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm text-zinc-100">{title}</span>
            <span className="text-xs text-zinc-500">{subTitle}</span>
          </div>
        </button>
      ))}
    </FloatingMenu>
  )
}
