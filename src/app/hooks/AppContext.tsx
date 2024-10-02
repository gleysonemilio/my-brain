'use client'

import { PagesInterface } from '@/components/NavBar'
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

type AppContextProps = {
  setInforPage: Dispatch<SetStateAction<PagesInterface>>
  inforPage: PagesInterface
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [inforPage, setInforPage] = useState<PagesInterface>({
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
