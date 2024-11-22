import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextIcon
} from '@radix-ui/react-icons'
import { BubbleMenu } from '@tiptap/react'
import { Link2, Link2Off, Paintbrush } from 'lucide-react'
import { useCallback } from 'react'

interface BubbleMenuComponents {
  editor: any
}

export const BubbleMenuComponents = ({ editor }: BubbleMenuComponents) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const toggleGroupItems = [
    {
      value: 'paragraph',
      ariaLabel: 'Toggle paragraph',
      onClick: () => editor.chain().focus().setParagraph().run(),
      Icon: <TextIcon />
    },
    {
      value: 'bold',
      ariaLabel: 'Toggle bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      Icon: <FontBoldIcon />
    },
    {
      value: 'italic',
      ariaLabel: 'Toggle italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      Icon: <FontItalicIcon />
    },
    {
      value: 'strikethrough',
      ariaLabel: 'Toggle strikethrough',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      Icon: <StrikethroughIcon />
    },
    {
      value: 'codeBlock',
      ariaLabel: 'Toggle code block',
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      Icon: <CodeIcon />
    },
    {
      value: 'setLink',
      ariaLabel: 'Set Link',
      onClick: () => setLink(),
      className: editor?.isActive('link') ? 'is-active' : '',
      Icon: <Link2 />
    },
    {
      value: 'unsetlink',
      ariaLabel: 'Unset link',
      onClick: () => editor?.chain().focus().unsetLink().run(),
      className: editor?.isActive('link') ? 'is-active' : '',
      Icon: <Link2Off />,
      disabled: !editor?.isActive('link')
    }
  ]

  const toggleGroupItemsColor = [
    {
      color: '#FFF',
      value: 'unsetColor'
    },
    {
      color: '#958DF1',
      value: 'setPurple'
    },
    {
      color: '#F98181',
      value: 'setRed'
    },
    {
      color: '#ffc83d',
      value: 'setYellow'
    }
  ]

  return (
    <BubbleMenu className="flex rounded-md bg-zinc-950" editor={editor} tippyOptions={{ duration: 100 }}>
      <ToggleGroup type="multiple" className="flex gap-1 p-1 rounded-md bg-zinc-950">
        {toggleGroupItems.map(({ ariaLabel, onClick, value, Icon, className }, index) => (
          <ToggleGroupItem
            key={index}
            value={value}
            aria-label={ariaLabel}
            onClick={onClick}
            className={className || ''}
          >
            {Icon}
          </ToggleGroupItem>
        ))}

        <div className="h-4 w-1 border-r-2 border-zinc-800"></div>

        {toggleGroupItemsColor.map(({ color, value }, index) => (
          <ToggleGroupItem
            key={index}
            value={value}
            aria-label={value}
            onClick={() =>
              value === 'unsetColor'
                ? editor.chain().focus().unsetColor().run()
                : editor.chain().focus().setColor(color).run()
            }
          >
            <Paintbrush color={color} size={16} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </BubbleMenu>
  )
}
