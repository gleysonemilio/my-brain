'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { createPage, getPagesOfUser, getUser } from '@/firebase/Api'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { AlignJustify, FilePlus2, FilesIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Command, CommandGroup, CommandItem, CommandList } from '../ui/command'

interface UserInterface {
  name: string
  email: string
  id: string
}

export interface PagesInterface {
  id?: string
  idUser: string
  title: string
  subtitle: string
  content?: string | null
  emoji?: string
}

export const SearchBook = () => {
  const { setInforPage, resertInforPage, pages, setPages } = useAppContext()

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [listUsers, setListUsers] = useState<Array<UserInterface>>([])
  const [emoji, setEmoji] = useState('')
  const [createNewPageInfor, setCreateNewPageInfor] = useState<PagesInterface>({
    title: '',
    idUser: '',
    subtitle: '',
    content: '',
    emoji: ''
  })

  useEffect(() => {
    const fetchGetUserData = async () => {
      const data = await getUser()
      setListUsers(data as UserInterface[])
    }

    fetchGetUserData()
  }, [])

  const ApigetPagesOfUser = async (idUser: string) => {
    try {
      const data = await getPagesOfUser(idUser)

      setPages(data as PagesInterface[])
    } catch (error) {
      console.error(error)
    }
  }

  const ApiSavePage = async () => {
    try {
      await createPage({ ...createNewPageInfor, emoji })
      setPopoverOpen(false)
      ApigetPagesOfUser(createNewPageInfor.idUser)
    } catch (error) {
      console.error(error)
    }
  }

  const returnListPapers = () => {
    return (
      pages.length > 0 && (
        <Command className="h-full mt-3 rounded-lg shadow-md bg-zinc-200">
          <CommandList className="max-h-full">
            <CommandGroup heading="Pages">
              {pages.map((ele) => (
                <div
                  key={ele.title}
                  onClick={() => {
                    resertInforPage()

                    setTimeout(() => {
                      return setInforPage(ele)
                    }, 100)
                  }}
                >
                  <CommandItem className="ml-2 cursor-pointer">
                    <span className="mr-2 h-4 w-4">{ele?.emoji || <FilesIcon />}</span>
                    <span>{ele.title}</span>
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )
    )
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex gap-2">
        <Select
          onValueChange={(e) => {
            ApigetPagesOfUser(e)
            setCreateNewPageInfor({ ...createNewPageInfor, idUser: e })
          }}
        >
          <SelectTrigger className="w-[180px] overflow-hidden text-zinc-400">
            <SelectValue placeholder="Select a user" className="overflow-hidden" />
          </SelectTrigger>
          <SelectContent className="overflow-hidden">
            <SelectGroup className="overflow-hidden">
              <SelectLabel>Users</SelectLabel>

              {listUsers.map(({ name, id }) => (
                <SelectItem value={id} key={id} className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 content-center rounded-sm bg-zinc-700 text-center font-medium text-zinc-500">
                      {name.substring(0, 1)}
                    </div>
                    <div>
                      <p className="font-light text-zinc-400">{name.split(' ')[0]}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Popover open={popoverOpen} onOpenChange={(e) => setPopoverOpen(e)}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilePlus2 color="#7b7b81" width={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="table w-80">
            <div className="grid gap-4">
              <div className="space-y-1">
                <h4 className="font-medium leading-none">Creater New Page</h4>
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
                    onChange={(e) =>
                      setCreateNewPageInfor({ ...createNewPageInfor, title: e.target.value })
                    }
                  />
                  <Button size={'sm'} onClick={() => ApiSavePage()}>
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
      </div>
      <div className="h-full">{returnListPapers()}</div>
    </div>
  )
}
