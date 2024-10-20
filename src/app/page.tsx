'use client'

import { NavBar } from '@/components/NavBar'
import { useAppContext } from './hooks/AppContext'
import Tiptap from '@/components/EditorContent'

export default function Home() {
  const { inforPage } = useAppContext()

  return (
    <div className="flex bg-zinc-900 w-[100%] h-[100%] md:mx-auto min-h-[900px] md:grid md:grid-cols-[16rem_1fr]">
      <NavBar />
      <main className="max-m-[700px] mx-auto pt-16 p-3 bg-zinc-900" >{inforPage.content ? <Tiptap /> : <span></span>}</main>
    </div>
  )
}
