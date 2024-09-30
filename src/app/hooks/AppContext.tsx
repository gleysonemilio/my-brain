'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type AppContextProps = {
  content: any
  setContent: any
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<string>('')

  return (
    <AppContext.Provider
      value={{
        setContent,
        content
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
