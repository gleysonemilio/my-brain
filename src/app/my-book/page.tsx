'use client'

import Tiptap from '@/components/EditorContent'
import { Hearder } from '@/components/Hearder'
import { PagesInterface } from '@/components/ModalCreateNewPage'
import { NavBar } from '@/components/NavBar'
import { getPagesOfUser } from '@/firebase/Api'
import { getCookie, getCookies } from 'cookies-next'
import { useEffect } from 'react'

import { useAppContext } from '../hooks/AppContext'

export default function Home() {
  const { inforPage, account, setAccount, setPages } = useAppContext()

  useEffect(() => {
    if (account?.uid) return

    setAccount(getCookies())
  }, [])

  const ApigetPagesOfUser = async () => {
    setPages([])
    try {
      const data = await getPagesOfUser(account.uid)

      setPages(data as PagesInterface[])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex h-[100vh] w-[100%] bg-zinc-900 md:mx-auto md:grid md:grid-cols-[16rem_1fr]">
      <header className="sm:fixed sm:z-10 sm:w-[100%] sm:bg-[#0b0b0c] sm:direction-normal md:hidden lg:hidden xl:hidden">
        <Hearder getUpdatePage={ApigetPagesOfUser} />
      </header>

      <aside className="sm:hidden md:flex lg:flex xl:flex">
        <NavBar getUpdatePage={ApigetPagesOfUser} />
      </aside>

      <main className="max-m-[700px] mx-auto w-[100%] bg-zinc-900 p-3 pt-14">
        {inforPage.content ? <Tiptap /> : <span></span>}
      </main>
    </div>
  )
}
