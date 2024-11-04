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
import { EllipsisIcon, EllipsisVerticalIcon, LogInIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ComponentProfile } from '../ComponentProfile'

export const DropdownLogout = () => {
  const router = useRouter()
  const { account } = useAppContext()

  const { displayName, photoURL, email, uid } = account

  const decodedImageUrl = (name: string) => decodeURIComponent(name as string)

  const handleLogOut = () => {
    ;['photoURL', 'photoURL', 'uid', 'email', 'displayName'].forEach((key) => deleteCookie(key))

    return router.push('/')
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <ComponentProfile icon background />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ComponentProfile />

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User2Icon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>
          <LogInIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
