import TopBar from '@/components/TopBar.tsx';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';

const HomePage = () => {
  const { trendingSongs, 
          featuredSongs, 
          madeForYouSongs, 
          isLoading, 
          fetchFeaturedSongs, 
          fetchMadeForYouSongs, 
          fetchTrendingSongs } = useMusicStore();
  
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

  console.log({isLoading, madeForYouSongs, trendingSongs, featuredSongs})
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'> 
      <TopBar/>
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good Afternoon</h1>
          <FeaturedSection/>
        </div>

        <div className='space-y-8'>
          <SectionGrid title="Made For You" songs={madeForYouSongs}/>
          <SectionGrid title="Trending" songs={trendingSongs}/>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage
