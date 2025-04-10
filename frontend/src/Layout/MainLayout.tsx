import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Outlet } from 'react-router';
import LeftSideBar from './components/LeftSideBar';
import FriendsActivity from './components/FriendsActivity';
import Audioplayer from './components/Audioplayer';
import PlayBackControls from './components/PlayBackControls';
import { useEffect, useState } from 'react';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);
  }, [setIsMobile])
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
        <Audioplayer/>
        {/* Left side bar component */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSideBar/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        {/* Main content area */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet/>
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

            {/* Right side bar component */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
              <FriendsActivity/>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlayBackControls/>
    </div>
  )
}

export default MainLayout
