'use client'

import { NavBar } from '@/components/NavBar'
import { useAppContext } from './hooks/AppContext'
import Tiptap from '@/components/EditorContent'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const { inforPage } = useAppContext()

  return (
    <div className=" bg-zinc-900 w-[100%] h-[100%] mx-auto min-h-[900px] grid grid-cols-[16rem_1fr]">
      <NavBar />

      <main className="max-m-[700px] mx-auto pt-16">{inforPage.content ? <Tiptap /> : <></>}</main>
    </div>
  )
}
