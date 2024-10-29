import LogoBrain from '@/assets/logo-brain-1.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4 h-[100vh]">
      <div className="col-span-1 bg-zinc-900">
        <div className="p-9">
          <Image
            src={LogoBrain}
            width={90}
            height={90}
            alt="Picture of the author"
            className="animate-pulse"
          />
        </div>
      </div>
      <div className="col-span-1 justify-center flex items-center">
        <div className="w-[75%] flex flex-col items-center gap-4">
          <div className="flex flex-col  w-full justify-center items-center">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Create an account
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <form className="grid w-full items-center gap-2">
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
            <Button variant="outline" className="w-full">
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
