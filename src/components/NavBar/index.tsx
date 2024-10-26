import Image from 'next/image'

import LogoBrain from '@/assets/logo-brain-1.png'
import { SearchBook } from '../SeachBook'

export const NavBar = () => {
  return (
    <div className="bg-[#0b0b0c] border-r-zinc-700 p-3 ">
      <Image src={LogoBrain} width={30} height={30} alt="Picture of the author" />

      <div className="flex content-center gap-2 justify-center items-center mt-3">
        <SearchBook />
      </div>
    </div>
  )
}
