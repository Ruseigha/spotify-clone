import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import SongsTable from "./SongsTable"

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex align-items-center justify-content-between relative">
          <div>
          <CardTitle className='flex items-center gap-2'>
							<Music className='size-5 text-emerald-500' />
							Songs Library
						</CardTitle>
            <CardDescription>Manage your music track</CardDescription>
          </div>
          <Button className=" bg-[green] absolute right-0">+</Button>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable/>
      </CardContent>
    </Card>
  )
}

export default SongsTabContent
