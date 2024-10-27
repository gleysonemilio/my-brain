import LogoBrain from '@/assets/logo-brain-1.png'
import Image from 'next/image'

import { SearchBook } from '../SeachBook'

export const NavBar = () => {
  return (
    <div className="border-r-zinc-700 bg-[#0b0b0c] p-3">
      <Image src={LogoBrain} width={70} height={30} alt="Picture of the author" />

      <div className="mt-3 flex content-center items-center justify-center gap-2">
        <SearchBook />
      </div>
    </div>
  )
}
