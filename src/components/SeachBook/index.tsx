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
  const { setInforPage, resertInforPage, pages, setPages, account, inforPage } = useAppContext()

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
        <span className="mr-1">{props?.emoji || '📑'}</span>
        <span
          className={`scroll-m-20 text-sm tracking-wider ${!props.selected ? 'text-zinc-400' : 'text-white font-semibold'}`}
        >
          {props.title}
        </span>
      </div>
    )
  }

  const ReturnListPapers = () => {
    return (
      pages.length > 0 && (
        <Command className="h-full mt-3 rounded-lg shadow-md ">
          <CommandList className="max-h-full">
            <CommandGroup>
              {pages.map((ele) => (
                <>
                  <CommandItem
                    key={ele.id}
                    className={`p-[3px] flex flex-row justify-between cursor-pointer items-start ${ele.id === inforPage.id && 'bg-zinc-800'}`}
                  >
                    <CommandTitle {...ele} selected={ele.id === inforPage.id} />

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
                        className={`ml-4 rounded-none border-l-2 cursor-pointer mb-[0.5px] border-zinc-800 ${subPage.id === inforPage.id && 'bg-zinc-800'}`}
                      >
                        <CommandTitle {...subPage} selected={subPage.id === inforPage.id} />
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

  // const ReturnListPapersShared = () => {
  //   return (
  //     pages.length > 0 && (
  //       <Command className="rounded-lg shadow-md ">
  //         <CommandList className="max-h-full">
  //           <CommandGroup>
  //             {pages.map((ele) => (
  //               <>
  //                 <CommandItem
  //                   key={ele.id}
  //                   className={`flex flex-row justify-between cursor-pointer items-start mb-1 ${ele.id === inforPage.id && 'bg-zinc-800'}`}
  //                 >
  //                   <CommandTitle {...ele} />
  //                 </CommandItem>
  //               </>
  //             ))}
  //           </CommandGroup>
  //         </CommandList>
  //       </Command>
  //     )
  //   )
  // }

  return (
    <div className="h-full flex flex-col">
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
      {/* <span className="scroll-m-20 text-sm font-semibold tracking-tight">Shared Pages</span>
       <ReturnListPapersShared /> */}

      <DropdownLogout />
    </div>
  )
}
