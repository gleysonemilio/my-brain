import { useAppContext } from '@/app/hooks/AppContext'
import { EllipsisVerticalIcon } from 'lucide-react'
import Image from 'next/image'

export const ComponentProfile = ({
  icon,
  background
}: {
  icon?: boolean
  background?: boolean
}) => {
  const { account } = useAppContext()
  const { displayName, photoURL, email, uid } = account

  const decodedImageUrl = (name: string) => decodeURIComponent(name as string)

  return (
    <div
      className={`flex gap-3 justify-between items-center p-3 rounded-lg ${background && 'bg-zinc-900'}`}
    >
      <div className="flex flex-row gap-2  items-center">
        <Image
          src={decodedImageUrl(photoURL)}
          alt="photo profile"
          className="rounded-lg"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start gap-1">
          <small className="text-sm font-bold leading-none">{decodedImageUrl(displayName)}</small>
          <p className="text-xs text-muted-foreground text-zinc-700">{decodedImageUrl(email)}</p>
        </div>
      </div>
      {icon && <EllipsisVerticalIcon size={20} />}
    </div>
  )
}
