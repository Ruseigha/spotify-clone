import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import { Link } from 'react-router'
import SignInOAuthButton from './SignInOAuthButton'
import { useAuthStore } from '@/stores/useAuthStore'

const TopBar = () => {
  const { isAdmin } = useAuthStore()
  return (
    <div className='flex justify-between items-center bg-zinc-900/75 p-4 sticky top-0 z-10 backdrop-blur-md rounded-md mb-0'>
      <div className='flex gap-2 items-center'>
        <img src="/spotify.png" alt="spotify logo" className='size-8'/>
        Rufify
      </div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <div className='flex items-center justify-center bg-black p-1 px-2 rounded-xs hover:bg-black/30'>
            <LayoutDashboardIcon className='size-4 mr-2'/>
            <Link to={`/admin`}>Admin Dashboard</Link>
          </div>
        )}

        <SignedIn>
          <SignOutButton/>
        </SignedIn>
        
        <SignedOut>
          <SignInOAuthButton/>
        </SignedOut>

        <UserButton/>
      </div>      
    </div>
  )
}

export default TopBar
