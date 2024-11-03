import LogoBrain from '@/assets/logo-brain-1.png'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'

import { SearchBook } from '../SeachBook'

export const Hearder = () => {
  return (
    <div className="flex justify-between gap-2 p-2">
      <div className="flex items-center">
        <Image src={LogoBrain} width={70} height={50} alt="Picture of the author" />
      </div>
      <div className="h-full">
        <Sheet>
          <SheetTrigger className="w-[100%]">
            <Button variant="outline">
              <AlignJustify color="#7b7b81" width={16} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Select Book</SheetTitle>
              <div className="h-[95%] flex flex-col mt-3 gap-3">
                <SearchBook />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
