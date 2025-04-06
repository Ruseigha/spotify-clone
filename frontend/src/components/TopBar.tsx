import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import SignInOAuthButton from './SignInOAuthButton'

const TopBar = () => {
  const isAmin = false // Replace with actual logic to determine if the user is an admin
  return (
    <div className='flex justify-between items-center bg-zinc-900/75 p-4 sticky top-0 z-10 backdrop-blur-md'>
      <div className='flex gap-2 items-center '>
        Rufify
      </div>
      <div className='flex items-center gap-4'>
        {isAmin && (
          <>
            <LayoutDashboardIcon className='size-4 mr-2'/>
            <Link to={`/admin`}>Admin Dashboard</Link>
          </>
        )}

        <SignedIn>
          <SignOutButton/>
        </SignedIn>
        
        <SignedOut>
          <SignInOAuthButton/>
        </SignedOut>
      </div>      
    </div>
  )
}

export default TopBar
