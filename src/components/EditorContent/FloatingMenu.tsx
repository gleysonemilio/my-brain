import { FloatingMenu } from '@tiptap/react'
import { Heading1, ListChecks } from 'lucide-react'

interface FloatingMenuInterface {
  editor: any
}

export const FloatingMenuComponent = ({ editor }: FloatingMenuInterface) => {
  const floatingGoupItem = [
    {
      img: 'https://www.notion.so/images/blocks/header.57a7576a.png',
      title: 'Heading 1',
      subTitle: 'Big section heading',
      isActive: 'heading',
      ActionButton: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      img: 'https://www.notion.so/images/blocks/subheader.9aab4769.png',
      title: 'Heading 2',
      subTitle: 'Medium section heading',
      isActive: 'heading',
      ActionButton: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      img: 'https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png',
      title: 'Heading 3',
      subTitle: 'Small section heading',
      isActive: 'heading',
      ActionButton: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
    },
    {
      img: 'https://www.notion.so/images/blocks/quote/en-US.png',
      title: 'Blockquote',
      subTitle: 'Create a simple Blockquote',
      isActive: 'blockquote',
      ActionButton: () => editor.chain().focus().setBlockquote().run()
    },
    {
      img: 'https://www.notion.so/images/blocks/bulleted-list.0e87e917.png',
      title: 'Bulleted list',
      subTitle: 'Create a simple bulleted list',
      isActive: 'bulletList',
      ActionButton: () => editor.chain().focus().toggleBulletList().run()
    },
    {
      img: 'https://www.notion.so/images/blocks/numbered-list.0406affe.png',
      title: 'Ordered List',
      subTitle: 'Create a simple Ordered list',
      isActive: 'orderedList',
      ActionButton: () => editor.chain().focus().toggleOrderedList().run()
    },
    {
      img: <ListChecks color="black" />,
      title: 'Task List',
      subTitle: 'Create a simple Task List',
      isActive: 'taskList',
      ActionButton: () => editor.chain().focus().toggleTaskList().run()
    }
    // {
    //   img: '',
    //   title: 'Insert table',
    //   subTitle: 'Create a simple Ordered list',
    //   isActive: 'insertTable',
    //   ActionButton: () =>
    //     editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    // }
    // {
    //   img: '',
    //   title: 'Hard break',
    //   subTitle: 'Create a simple Hard break',
    //   isActive: 'hardbreak',
    //   ActionButton: () => editor.chain().focus().setHardBreak().run()
    // }
  ]

  return (
    <FloatingMenu
      editor={editor}
      className="flex flex-col overflow-hidden rounded-md border border-zinc-900 bg-zinc-900 p-1 shadow-xl"
      shouldShow={({ state }) => {
        const { $from } = state.selection

        const currentLineText = $from.nodeBefore?.textContent

        return currentLineText === '/'
      }}
    >
      {floatingGoupItem.map(({ title, subTitle, img, ActionButton }, index) => (
        <button
          key={index}
          onClick={() => ActionButton()}
          className="flex min-w-[280px] items-center gap-2 p-1 hover:rounded hover:bg-zinc-800"
        >
          {typeof img === 'string' ? (
            <img src={img} alt="text" className="w-12 rounded border-zinc-600 bg-zinc-50" />
          ) : (
            <div className="w-12 h-12 rounded border-zinc-600 bg-zinc-50 flex justify-center items-center">
              {img}
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="text-sm text-zinc-100">{title}</span>
            <span className="text-xs text-zinc-500">{subTitle}</span>
          </div>
        </button>
      ))}
    </FloatingMenu>
  )
}
