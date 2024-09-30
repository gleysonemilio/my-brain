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
import { FilePlus2 } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { getPagesOfUser, getUser } from '@/firebase/Api'

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon
} from '@radix-ui/react-icons'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

interface UserInterface {
  name: string
  email: string
  id: string
}

interface PagesInterface {
  description: string
  id: string
  idUser: string
  name: string
}

export const NavBar = () => {
  const [listUsers, setListUsers] = useState<Array<UserInterface>>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [pages, setPages] = useState<Array<PagesInterface>>([])
  const { setContent } = useAppContext()

  useEffect(() => {
    const fetchGetUserData = async () => {
      const data = await getUser()
      setListUsers(data)
    }

    fetchGetUserData()
  }, [])

  const ApigetPagesOfUser = async (idUser: string) => {
    const data = await getPagesOfUser(idUser)
    setPages(data)
  }

  return (
    <aside className="bg-[#0b0b0c] border-r-zinc-700 p-2">
      <div className="flex content-center gap-2 justify-center items-center mt-3">
        <Select onValueChange={(e) => ApigetPagesOfUser(e)}>
          <SelectTrigger className="w-[180px] text-zinc-400 overflow-hidden">
            <SelectValue placeholder="Select a user" className="overflow-hidden" />
          </SelectTrigger>
          <SelectContent className="overflow-hidden">
            <SelectGroup className="overflow-hidden">
              <SelectLabel>Users</SelectLabel>

              {listUsers.map(({ name, id }) => (
                <SelectItem value={id} className="overflow-hidden">
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

        <Toggle variant="outline" aria-label="Toggle italic">
          <FilePlus2 color="#7b7b81" width={16} />
        </Toggle>
      </div>

      {pages.length > 0 && (
        <Command className="rounded-lg shadow-md mt-3">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            <CommandGroup heading="Pages">
              {pages.map(({ name, description }) => (
                <div
                  onClick={() => {
                    setContent(description)

                    console.log(description)
                  }}
                >
                  <CommandItem className="cursor-pointer ml-2">
                    <FaceIcon className="mr-2 h-4 w-4" />
                    <span>{name.split(' ')[0]}</span>
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>

            {/* <CommandSeparator /> */}
          </CommandList>
        </Command>
      )}
    </aside>
  )
}
