'use client'

import IconGoogle from '@/assets/icons-google.svg'
import LogoBrain from '@/assets/logo-brain-1.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInWithPopupFirebase } from '@/firebase/Api'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const ImgLogo = (className: string) => {
    return <Image src={LogoBrain} width={100} alt="Picture of the Logo" className={className} />
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    // signInApp()

    // router.push('/')
  }

  const handleSignLogin = async () => {
    if (getCookie('uid')) return router.push('/')

    try {
      await signInWithPopupFirebase()

      router.push('/my-book')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 h-[100vh]">
      <div className=" bg-zinc-900 md:flex md:col-span-1 sm:hidden">
        <div className="p-9">{ImgLogo('animate-pulse')}</div>
      </div>

      <div className="col-span-1 sm:justify-evenly md:justify-center flex flex-col items-center gap-11">
        {ImgLogo('sm:flex md:hidden animate-pulse')}
        <div className="sm:max-w-lg md:max-w-md flex flex-col items-center gap-4 p-4">
          <div className="flex flex-col w-full justify-center items-center">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Create an account
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid w-full items-center gap-2">
            <Input id="email" type="email" placeholder="name@example.com" />
            <Button>Sign In with Email</Button>
          </form>

          <div className="flex w-full justify-center items-center gap-2 text-zinc-400">
            <hr className="w-full border-zinc-800" />
            <p className="flex text-sm text-muted-foreground uppercase min-w-36">
              Or continue with
            </p>
            <hr className="w-full border-zinc-800" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Button variant="outline" className="w-full gap-2" onClick={handleSignLogin}>
              <Image width={15} alt="Icon Google" src={IconGoogle} />
              Google
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground text-zinc-700">
            By clicking continue, you agree to our Terms <br /> of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
