'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import { createPage, createSubPage, getPagesOfUser, getSubPage, getUser } from '@/firebase/Api'
import { useEffect, useState } from 'react'

import { DropdownLogout } from '../DropdownLogout'
import { ModalCreateNewPage } from '../ModalCreateNewPage'
import { Command, CommandGroup, CommandItem, CommandList } from '../ui/command'

export interface PagesInterface {
  id?: string
  idUser: string
  title: string
  subtitle?: string
  content?: string | null
  emoji?: string
  subPages?: any
}

export interface SubPagesInterface {
  id?: string
  idPage: string
  title: string
  subtitle?: string
  content?: string | null
  emoji?: string
}

export const SearchBook = () => {
  const { setInforPage, resertInforPage, pages, setPages, account } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      await ApigetPagesOfUser(account.uid)
    }

    fetchData()
  }, [account.uid])

  const ApigetPagesOfUser = async (id: string) => {
    try {
      const data = await getPagesOfUser(id)

      setPages(data as PagesInterface[])
    } catch (error) {
      console.error(error)
    }
  }

  const ApiCreatePage = async (title: string, emoji: string) => {
    if (!title) return
    try {
      await createPage({ title, emoji, idUser: account.uid })

      ApigetPagesOfUser(account.uid)
    } catch (error) {
      console.error(error)
    }
  }

  const ApiCreateSubPage = async (idPage: string, title: string, emoji: string) => {
    try {
      await createSubPage({ idPage, title, emoji })

      ApiGetSubPage(idPage)
    } catch (error) {
      console.error(error)
    }
  }

  const ApiGetSubPage = async (idPage: string) => {
    try {
      const data = await getSubPage(idPage)

      setPages(pages.map((ele) => (ele.id === idPage ? { ...ele, subPages: data } : ele)))
    } catch (error) {
      console.error(error)
    }
  }

  const CommandTitle = (props: any) => {
    return (
      <div
        onClick={() => {
          resertInforPage()

          if (!props.subPages) {
            ApiGetSubPage(props.id as string)
          }

          setTimeout(() => {
            return setInforPage(props)
          }, 100)
        }}
      >
        <span className="mr-1 h-4 w-4">{props?.emoji || '📑'}</span>
        <span className="scroll-m-20 text-sm font-semibold tracking-tight">{props.title}</span>
      </div>
    )
  }

  const ReturnListPapers = () => {
    const [open, setOpen] = useState(false)
    return (
      pages.length > 0 && (
        <Command className="h-full mt-3 rounded-lg shadow-md bg-zinc-200">
          <CommandList className="max-h-full">
            <CommandGroup>
              {pages.map((ele) => (
                <>
                  <CommandItem
                    key={ele.id}
                    className="flex flex-row justify-between cursor-pointer items-start"
                  >
                    <CommandTitle {...ele} />

                    <ModalCreateNewPage
                      title={`${ele.title} - Create New Sub Page `}
                      ApiCreatePage={(title, emoji) =>
                        ApiCreateSubPage(ele.id as string, title, emoji)
                      }
                    />
                  </CommandItem>
                  {ele.subPages &&
                    ele.subPages.map((subPage: any) => (
                      <CommandItem
                        key={subPage.id}
                        className="ml-4 rounded-none border-l-2 border-zinc-800"
                      >
                        <CommandTitle {...subPage} />
                      </CommandItem>
                    ))}
                </>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )
    )
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-full">
        <div className="flex flex-row justify-between items-center">
          <span className="scroll-m-20 text-sm font-semibold tracking-tight">Books</span>
          <ModalCreateNewPage
            title="Create new Page"
            ApiCreatePage={(title, emoji) => ApiCreatePage(title, emoji)}
          />
        </div>
        <ReturnListPapers />
      </div>

      <DropdownLogout />
    </div>
  )
}
