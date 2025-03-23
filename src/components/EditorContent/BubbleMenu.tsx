import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { BubbleMenu } from '@tiptap/react'
import {
  ALargeSmall,
  Bold,
  CodeXml,
  Highlighter,
  Italic,
  Link2,
  Link2Off,
  ListChecks,
  Paintbrush,
  Strikethrough,
  Type
} from 'lucide-react'
import { useCallback } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface BubbleMenuComponents {
  editor: any
}

interface TooltipComponentInterface {
  children: React.ReactNode
  msg: string
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
      Icon: <ALargeSmall size={20} />,
      msg: 'Text'
    },
    {
      value: 'bold',
      ariaLabel: 'Toggle bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      Icon: <Bold size={15} />,
      msg: 'Bold'
    },
    {
      value: 'italic',
      ariaLabel: 'Toggle italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      Icon: <Italic size={15} />,
      msg: 'italic'
    },
    {
      value: 'strikethrough',
      ariaLabel: 'Toggle strikethrough',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      Icon: <Strikethrough size={15} />,
      msg: 'Toggle strikethrough'
    },
    {
      value: 'codeBlock',
      ariaLabel: 'Toggle code block',
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      className: editor?.isActive('codeBlock') ? 'is-active' : '',
      Icon: <CodeXml size={15} />,
      msg: 'Code Block'
    },
    {
      value: 'setLink',
      ariaLabel: 'Set Link',
      onClick: () => setLink(),
      className: editor?.isActive('setLink') ? 'is-active' : '',
      Icon: <Link2 size={15} />,
      disabled: !editor?.isActive('setLink'),
      msg: 'Set Link'
    },
    {
      value: 'unsetlink',
      ariaLabel: 'Unset link',
      onClick: () => editor?.chain().focus().unsetLink().run(),
      className: editor?.isActive('unsetlink') ? 'is-active' : '',
      Icon: <Link2Off size={15} />,
      disabled: !editor?.isActive('unsetlink'),
      msg: 'Unset Link'
    },
    {
      value: 'taskList',
      ariaLabel: 'Task List',
      onClick: () => editor.chain().focus().toggleTaskList().run(),
      className: editor?.isActive('taskList') ? 'is-active' : '',
      Icon: <ListChecks size={15} />,
      disabled: !editor?.isActive('taskList'),
      msg: 'Task List'
    },
    {
      value: 'highlight',
      ariaLabel: 'Highlight',
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      Icon: <Highlighter size={15} />,
      className: editor?.isActive('highlight') ? 'is-active' : '',
      disabled: !editor?.isActive('highlight'),
      msg: 'Highlight'
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
    },
    {
      color: '#7CEA9C',
      value: 'setGreen'
    },
    {
      color: '#63B3ED',
      value: 'setBlue'
    },
    {
      color: '#FAD8D6',
      value: 'setPink'
    }
  ]

  const TooltipComponent = ({ children, msg }: TooltipComponentInterface) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            style={{
              zIndex: 99999999
            }}
          >
            {msg}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <BubbleMenu
      className="flex rounded-md bg-zinc-950"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <ToggleGroup type="multiple" className="flex p-1 rounded-md bg-zinc-950">
        {toggleGroupItems.map(({ ariaLabel, onClick, value, Icon, msg, className }, index) => (
          <TooltipComponent msg={msg}>
            <ToggleGroupItem
              size="sm"
              key={index}
              value={value}
              aria-label={ariaLabel}
              onClick={onClick}
              className={className || ''}
            >
              {Icon}
            </ToggleGroupItem>
          </TooltipComponent>
        ))}

        <div className="h-4 w-1 border-r-2 border-zinc-800"></div>

        {toggleGroupItemsColor.map(({ color, value }, index) => (
          <ToggleGroupItem
            size="sm"
            key={index}
            value={value}
            aria-label={value}
            onClick={() =>
              value === 'unsetColor'
                ? editor.chain().focus().unsetColor().run()
                : editor.chain().focus().setColor(color).run()
            }
          >
            <Type color={color} size={16} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </BubbleMenu>
  )
}
