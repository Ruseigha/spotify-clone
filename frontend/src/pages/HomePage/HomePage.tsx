import TopBar from '@/components/TopBar.tsx';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';
import { usePlayerStore } from '@/stores/usePlayerStore';

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

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0){
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  },[initializeQueue, featuredSongs, madeForYouSongs, trendingSongs])

  return (
    <main className='rounded-md overflow-hidden h-[calc(100vh-100px)] bg-gradient-to-b from-zinc-800 to-zinc-900'> 
      <TopBar/>
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good Afternoon</h1>
          <FeaturedSection/>
        

          <div className='space-y-8'>
            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}/>
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage
