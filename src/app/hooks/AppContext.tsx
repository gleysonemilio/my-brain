'use client'

import { PagesInterface } from '@/components/SeachBook'
import { UpdatePageInterface } from '@/firebase/Api'
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'

type AppContextProps = {
  setInforPage: Dispatch<any>
  inforPage: UpdatePageInterface
  resertInforPage: () => void
  pages: PagesInterface[]
  setPages: Dispatch<any>
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

const defaultInforPage = {
  id: '',
  idUser: '',
  title: '',
  subtitle: '',
  content: null
  // content: `<h1>About what are you thinking?🤔</h1><span></span><span><strong>Dia 1</strong>: ([Itinerário no Google Maps](https://www.google.com/maps/dir/?api=1&amp;origin=Gran+V%C3%ADa%2C+Madrid&amp;destination=Museo+del+Prado%2C+Madrid&amp;travelmode=walking&amp;waypoints=Banco+de+Espa%C3%B1a%2C+Madrid%7CFuente+de+Cibeles%2C+Madrid%7CPalacio+de+Cibeles%2C+Madrid%7CPuerta+de+Alcal%C3%A1%2C+Madrid%7CParque+del+Retiro%2C+Madrid%7CPalacio+de+Cristal%2C+Madrid%7CJard%C3%ADn+Bot%C3%A1nico+de+Madrid%7CPalacio+de+Vel%C3%A1zquez%2C+Madrid%7CPaseo+del+Prado%2C+Madrid))</span><span>1. <strong>Gran Vía</strong></span><span>2. <strong>Banco de España</strong></span><span>3. <strong>Fuente de Cibeles</strong></span><span>4. <strong>Palacio de Cibeles</strong></span><span>5. <strong>Puerta de Alcalá</strong></span><span>6. <strong>Parque del Retiro</strong></span><span>7. <strong>Palacio de Cristal</strong></span><span>8. <strong>Jardín Botánico de Madrid</strong></span><span>9. <strong>Palacio de Velázquez</strong></span><span>10. <strong>Paseo del Prado</strong></span><span>11. <strong>Museo del Prado</strong></span><span>---</span><span><strong>Dia 2</strong>: [Itinerário no Google Maps](https://www.google.com/maps/dir/?api=1&amp;origin=Plaza+Santa+Ana%2C+Madrid&amp;destination=Templo+de+Debod%2C+Madrid&amp;travelmode=walking&amp;waypoints=Mercado+de+San+Miguel%2C+Madrid%7CPlaza+Mayor%2C+Madrid%7CPuerta+del+Sol%2C+Madrid%7CPlaza+de+Oriente%2C+Madrid%7CAlmudena+Cathedral%2C+Madrid%7CPalacio+Real%2C+Madrid%7CJardines+de+Sabatini%2C+Madrid%7CPlaza+Espa%C3%B1a%2C+Madrid)</span><span>1. <strong>Plaza Santa Ana</strong></span><span>2. <strong>Mercado de San Miguel</strong></span><span>3. <strong>Plaza Mayor</strong></span><span>4. <strong>Puerta del Sol</strong></span><span>5. <strong>Plaza de Oriente</strong></span><span>6. <strong>Almudena Cathedral</strong></span><span><span style="color: #958DF1">7. <strong>Palacio Real</strong></span></span><span><span style="color: #F98181"><em>8. </em><strong><em>Jardines de Sabatini</em></strong></span></span><spanre><code>9. Plaza España</code></spanre><span>10. <strong>Templo de Debod</strong></span><span>---</span><span></span><span>teste</span><span></span>`
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = useState<Array<PagesInterface>>([])
  const [inforPage, setInforPage] = useState<any>(defaultInforPage)

  const resertInforPage = () => {
    setInforPage(defaultInforPage)
  }

  return (
    <AppContext.Provider
      value={{
        resertInforPage,
        setInforPage,
        inforPage,
        pages,
        setPages
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
