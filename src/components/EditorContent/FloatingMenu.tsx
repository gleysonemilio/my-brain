import { FloatingMenu } from '@tiptap/react'

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
      img: 'https://www.notion.so/images/blocks/bulleted-list.0e87e917.png',
      title: 'Bulleted list',
      subTitle: 'Create a simple bulleted list',
      isActive: 'paragraph',
      ActionButton: () => editor.chain().focus().setParagraph().run()
    }
  ]

  return (
    <FloatingMenu
      editor={editor}
      className="rounded-md border bg-zinc-900 shadow-xl border-zinc-900 overflow-hidden flex flex-col p-1"
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
          className="flex items-center gap-2 p-1 min-w-[280px] hover:bg-zinc-800 hover:rounded"
        >
          <img src={img} alt="text" className="w-12 border-zinc-600 rounded" />
          <div className="flex flex-col text-left">
            <span className="text-sm text-zinc-100">{title}</span>
            <span className="text-xs text-zinc-500">{subTitle}</span>
          </div>
        </button>
      ))}
    </FloatingMenu>
  )
}
