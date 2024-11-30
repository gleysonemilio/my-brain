'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signInWithOutPopupFirebase } from '@/firebase/Api'
import { deleteCookie } from 'cookies-next'
import { EllipsisIcon, EllipsisVerticalIcon, LogInIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ComponentProfile } from '../ComponentProfile'

export const DropdownLogout = () => {
  const router = useRouter()

  const handleLogOut = async () => {
    ;['photoURL', 'photoURL', 'uid', 'email', 'displayName'].forEach((key) => deleteCookie(key))

    await signInWithOutPopupFirebase()

    return router.push('/')
  }

  return (
    <DropdownMenu>
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
