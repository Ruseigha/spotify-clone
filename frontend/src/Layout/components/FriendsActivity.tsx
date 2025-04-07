import { Avatar } from '@/components/ui/avatar';
import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { HeadphonesIcon, Music, User } from 'lucide-react';
import { useEffect } from 'react'

const FriendsActivity = () => {
  const {users, isLoading, error, fetchUsers} = useChatStore();
  const { user } = useUser();
  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);
  const isPlaying = true; 
  return (
    <div className='h-full max-h-[calc(100vh-100px)] bg-zinc-900 rounded-lg flex flex-col'>
      <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
        <div className='flex items-center gap-2'>
          <User className='size-5 shrink-0'/>
          <h2>what they're listening to</h2>
        </div>
      </div>

      {!user && <LoginPrompt/>}

      <ScrollArea className='flex-1'>
        <div className='p-4 space-y-4'>
          {users.map((user) => (
            <div className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group' key={user._id}>
              <div className='flex items-start gap-3'>
                <div className='relative'>
                  <Avatar className='size-10 border border-zinc-800'>
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName}  
                    />
                     <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                     <div className='absolute bottom-0 right-0 size-3 rounded-full border-zinc-900 bg-zinc-500' aria-hidden="true"/>
                  </Avatar>
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-sm text-white'>{user.fullName}</span>
                    {isPlaying && <Music className='size-3.5 text-emerald-400 shrink-0'/>}
                  </div>
                  {isPlaying ? (
                    <div className='mt-1'>
                      <div className='mt-1 text-sm text-white font-medium truncate'>
                        Cardigan
                      </div>
                      <div className='text-xs text-zinc-400 truncate'>by Taylor Swift</div>
                    </div>
                  ) : (
                    <div>Idle</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative'>
			<div
				className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
			/>
			<div className='relative bg-zinc-900 rounded-full p-4'>
				<HeadphonesIcon className='size-8 text-emerald-400' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
		</div>
	</div>
);

export default FriendsActivity
