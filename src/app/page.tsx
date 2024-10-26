'use client'

import { NavBar } from '@/components/NavBar'
import { useAppContext } from './hooks/AppContext'
import Tiptap from '@/components/EditorContent'
import { Hearder } from '@/components/Hearder'

export default function Home() {
  const { inforPage } = useAppContext()

  return (
    <div className="flex bg-zinc-900 w-[100%] h-[100%] md:mx-auto min-h-[900px] md:grid md:grid-cols-[16rem_1fr]">
      <header className="sm:fixed sm:direction-normal sm:w-[100%] sm:bg-[#0b0b0c] sm:z-10 md:hidden lg:hidden xl:hidden">
        <Hearder />
      </header>

      <aside className="sm:hidden md:flex lg:flex xl:flex">
        <NavBar />
      </aside>

      <main className="w-[100%] max-m-[700px] mx-auto pt-14 p-3 bg-zinc-900">
        {inforPage.content ? <Tiptap /> : <span></span>}
      </main>
    </div>
  )
}
