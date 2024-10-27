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
      <div>
        <Image src={LogoBrain} width={70} height={50} alt="Picture of the author" />
      </div>
      <div>
        <Sheet>
          <SheetTrigger className="w-[100%]">
            <Button variant="outline">
              <AlignJustify color="#7b7b81" width={16} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Select Book</SheetTitle>
              <SheetDescription>
                <SearchBook />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
