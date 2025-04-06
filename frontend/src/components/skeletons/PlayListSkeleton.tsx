import React from 'react'

const PlayListSkeleton = () => {
  return Array.from({ length: 7}).map((_, index) => (
    <div key={index} className='flex items-center gap-3 p-2 rounded-md'>
      <div className='w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse'/>
      <div className='flex-1 min-w-0 hidden md:block space-y-2'>
        <div className='h-4 bg-zinc-800 rounded animate-pulse w-3/4' />
        <div className='h-4 bg-zinc-800 rounded animate-pulse w-3/4' />
      </div>
    </div>
  ))
}

export default PlayListSkeleton
