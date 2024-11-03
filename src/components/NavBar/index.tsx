import LogoBrain from '@/assets/logo-brain-1.png'
import Image from 'next/image'

import { SearchBook } from '../SeachBook'

export const NavBar = () => {
  return (
    <div className="h-[100vh] border-r-zinc-700 bg-[#0b0b0c] p-3 gap-5">
      <Image src={LogoBrain} width={70} height={30} alt="Picture of the author" />

      <div className="h-[95%] flex flex-col mt-3 gap-3">
        <SearchBook />
      </div>
    </div>
  )
}
