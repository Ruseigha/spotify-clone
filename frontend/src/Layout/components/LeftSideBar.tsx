import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, MessageCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const LeftSideBar = () => {
  return (
    <div className='h-full flex flex-col gap-2'>
      {/* navigation menu */}
      <div className='rounded-lg bg-zinc-900 p-4'>
        <div className='space-y-2 '>
          <Link to={`/`} className={cn(buttonVariants({
            variant: "ghost",
            className: "w-full justify-start text-sm text-zinc-200 hover:bg-zinc-800"
          }))}>
            <HomeIcon className='mr-2 size-5'/>
            <span className='hidden md:inline'>Home</span>
          </Link>

          <SignedIn>
            <Link to={`/chat`} className={cn(buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-sm text-zinc-200 hover:bg-zinc-800"
            }))}>
              <MessageCircle className='mr-2 size-5'/>
              <span className='hidden md:inline'>Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* library section */}
    </div>
  )
}

export default LeftSideBar
