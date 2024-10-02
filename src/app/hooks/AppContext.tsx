'use client'

import { PagesInterface } from '@/components/NavBar'
import React, { createContext, useContext, useState } from 'react'

type AppContextProps = {
  setInforPage: any
  inforPage: PagesInterface
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [inforPage, setInforPage] = useState<any>({
    id: '',
    idUser: '',
    title: '',
    subtitle: '',
    content: ''
  })

  return (
    <AppContext.Provider
      value={{
        setInforPage,
        inforPage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export { AppContext, AppProvider, useAppContext }
