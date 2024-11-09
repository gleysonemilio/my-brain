'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { AlignJustify, FilePlus2, FilesIcon, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface PagesInterface {
  id?: string
  idUser: string
  title: string
  subtitle?: string
  content?: string | null
  emoji?: string
}

export interface SubPagesInterface {
  id?: string
  idPage: string
  title: string
  subtitle?: string
  content?: string | null
  emoji?: string
}

export const ModalCreateNewPage = ({
  title,
  ApiCreatePage
}: {
  title: string
  ApiCreatePage: (title: any, emoji: any) => Promise<void>
}) => {
  const [emoji, setEmoji] = useState('')
  const [titleNewPage, setTitleNewPage] = useState<string>('')
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Popover open={popoverOpen} onOpenChange={(e) => setPopoverOpen(e)}>
      <PopoverTrigger asChild>
        <button>
          <Plus color="#7b7b81" width={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="table w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-muted-foreground text-sm">
              Select an emoji then enter the name of your book.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="flex flex-row items-center gap-4">
              <span className="text-5xl">{emoji}</span>
              <Input
                id="width"
                className="h-8 w-[100%]"
                placeholder="Title"
                onChange={(e) => setTitleNewPage(e.target.value)}
              />
              <Button size="sm" onClick={() => ApiCreatePage(titleNewPage, emoji)}>
                save
              </Button>
            </div>
            <hr className="w-full border-zinc-800" />

            <div>
              <p className="text-muted-foreground text-sm">select emoji</p>
              <Picker data={data} onEmojiSelect={(value: any) => setEmoji(value.native)} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
