import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Trash } from 'lucide-react'

import { Button } from '../ui/button'

export const ModalDeletePage = ({
  title,
  ApiDeletePageOfUser
}: {
  title: string
  ApiDeletePageOfUser: () => Promise<void>
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="secondary">
          <Trash color="#7b7b81" width={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete the page '{title}' ? 😭</AlertDialogTitle>
          <AlertDialogDescription>
            This page will be permanently deleted if you click yes
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel className="w-full">No</AlertDialogCancel>
          <AlertDialogAction className="w-full" onClick={ApiDeletePageOfUser}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
