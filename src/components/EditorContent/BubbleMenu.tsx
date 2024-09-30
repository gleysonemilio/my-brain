import { BubbleMenu } from '@tiptap/react'
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon
} from '@radix-ui/react-icons'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface BubbleMenuComponents {
  editor: any
}

export const BubbleMenuComponents = ({ editor }: BubbleMenuComponents) => {
  const toggleGroupItems = [
    {
      value: 'bold',
      ariaLabel: 'Toggle bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      Icon: <FontBoldIcon className="h-4 w-4" />
    },
    {
      value: 'italic',
      ariaLabel: 'Toggle italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      Icon: <FontItalicIcon className="h-4 w-4" />
    },
    {
      value: 'strikethrough',
      ariaLabel: 'Toggle strikethrough',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      Icon: <StrikethroughIcon className="h-4 w-4" />
    },
    {
      value: 'codeBlock',
      ariaLabel: 'Toggle code block',
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      Icon: <CodeIcon className="h-4 w-4" />
    }
  ]

  const toggleGroupItemsColor = [
    {
      color: '#958DF1',
      value: 'setPurple'
    },
    {
      color: '#F98181',
      value: 'setRed'
    },
    {
      color: '#FFF',
      value: 'unsetColor'
    }
  ]

  return (
    <BubbleMenu
      className=" bg-zinc-950 rounded-md p-1"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <ToggleGroup type="multiple">
        {toggleGroupItems.map(({ ariaLabel, onClick, value, Icon }) => (
          <ToggleGroupItem value={value} aria-label={ariaLabel} onClick={onClick}>
            {Icon}
          </ToggleGroupItem>
        ))}

        <div className="w-1 h-4 border-r-2 border-zinc-800"></div>

        {toggleGroupItemsColor.map(({ color, value }) => (
          <ToggleGroupItem
            value={value}
            aria-label={value}
            onClick={() =>
              value === 'unsetColor'
                ? editor.chain().focus().unsetColor().run()
                : editor.chain().focus().setColor(color).run()
            }
          >
            <div className={`h-5 w-5 bg-[${color}] rounded-xl`} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </BubbleMenu>
  )
}
