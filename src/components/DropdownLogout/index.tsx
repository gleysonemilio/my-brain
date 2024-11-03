'use client'

import { useAppContext } from '@/app/hooks/AppContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { deleteCookie } from 'cookies-next'
import { EllipsisIcon, EllipsisVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const DropdownLogout = () => {
  const router = useRouter()
  const { account } = useAppContext()

  const { displayName, photoURL, email, uid } = account

  const decodedImageUrl = (name: string) => decodeURIComponent(name as string)

  const handleLogOut = () => {
    ['photoURL', 'photoURL', 'uid', 'email', 'displayName'].forEach((key) => deleteCookie(key))

    return router.push('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-3 justify-center items-center bg-zinc-900 p-3 rounded-lg">
          <Image
            src={decodedImageUrl(photoURL)}
            alt="photo profile"
            className="rounded-lg"
            width={40}
            height={40}
          />

          <div className="flex flex-col items-start gap-1">
            <small className="text-sm font-bold leading-none">{decodedImageUrl(displayName)}</small>
            <p className="text-xs text-muted-foreground text-zinc-700"> {decodedImageUrl(email)}</p>
          </div>

          <EllipsisVerticalIcon size={40} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
