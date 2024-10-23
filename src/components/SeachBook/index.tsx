'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { createPage, getPagesOfUser, getUser } from '@/firebase/Api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandItem, CommandList, CommandGroup } from '../ui/command'

import { FilePlus2, FilesIcon, AlignJustify } from 'lucide-react'

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
  content?: string
}

export interface StateCreateNewPageInterface {
  idUser: string
  title: string
  subtitle: string
}

export const SearchBook = () => {
  const { setInforPage } = useAppContext()

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [pages, setPages] = useState<Array<PagesInterface>>([])
  const [listUsers, setListUsers] = useState<Array<UserInterface>>([])
  const [createNewPageInfor, setCreateNewPageInfor] = useState<StateCreateNewPageInterface>({
    title: '',
    idUser: '',
    subtitle: ''
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
      await createPage(createNewPageInfor)
      setPopoverOpen(false)
      ApigetPagesOfUser(createNewPageInfor.idUser)
    } catch (error) {
      console.error(error)
    }
  }

  const returnListPapers = () => {
    return (
      pages.length > 0 && (
        <Command className="rounded-lg shadow-md mt-3">
          <CommandList>
            <CommandGroup heading="Pages">
              {pages.map((ele) => (
                <div
                  key={ele.title}
                  onClick={() => {
                    setInforPage(ele)
                  }}
                >
                  <CommandItem className="cursor-pointer ml-2">
                    <FilesIcon className="mr-2 h-4 w-4" />
                    <span>{ele.title?.split(' ')[0]}</span>
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
    <>
      <div>
        <div className="flex gap-2">
          <Select
            onValueChange={(e) => {
              ApigetPagesOfUser(e)
              setCreateNewPageInfor({ ...createNewPageInfor, idUser: e })
            }}
          >
            <SelectTrigger className="w-[180px] text-zinc-400 overflow-hidden">
              <SelectValue placeholder="Select a user" className="overflow-hidden" />
            </SelectTrigger>
            <SelectContent className="overflow-hidden">
              <SelectGroup className="overflow-hidden">
                <SelectLabel>Users</SelectLabel>

                {listUsers.map(({ name, id }) => (
                  <SelectItem value={id} key={id} className="overflow-hidden">
                    <div className="flex gap-2 items-center">
                      <div className="w-6 h-6 bg-zinc-700 rounded-sm text-center font-medium text-zinc-500 content-center">
                        {name.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-zinc-400 font-light">{name.split(' ')[0]}</p>
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
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">Creater New Page</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
                <div className="grid gap-1">
                  <div className="grid grid-cols-[12rem_1fr] items-center gap-4">
                    <Input
                      id="width"
                      className="w-[100%] h-8"
                      placeholder="Title"
                      onChange={(e) =>
                        setCreateNewPageInfor({ ...createNewPageInfor, title: e.target.value })
                      }
                    />
                    <Button size={'sm'} onClick={() => ApiSavePage()}>
                      save
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>{returnListPapers()}</div>
      </div>
    </>
  )
}