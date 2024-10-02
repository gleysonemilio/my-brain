'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type AppContextProps = {
  content: any
  setContent: any
  setInforPage: any
  inforPage: any
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<string>('')
  const [inforPage, setInforPage] = useState<object>({
    id: '',
    idUser: '',
    title: '',
    subtitle: '',
    content: ''
  })

  return (
    <AppContext.Provider
      value={{
        setContent,
        content,
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
