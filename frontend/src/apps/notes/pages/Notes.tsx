import { Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AddANote from "../components/AddANote"
import SearchNote from "../components/SearchNote"
import RecentNotes from "../components/RecentNotes"
import AllNotes from "../components/AllNotes"

type Props = {}

function Home({}: Props) {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search) 
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

return (
  <div>
      <div className="flex flex-col m-2">
        <Link to='?tab=recent'>
          <h1 className='text-7xl py-4 mb-8 text-center font-bangers'>Tech Notes</h1>
        </Link>
        <div className='flex justify-center ml-4 mr-4 gap-4'>
          <div className="w-1/4">
            <Link to='?tab=add'>
              <Button className='w-full'>Add a note</Button>
            </Link>
          </div>
          <div className="w-1/4">
            <Link to='?tab=all'>
              <Button className='w-full'>All notes</Button>
            </Link>
          </div>
          <div className="w-1/4">
            <Link to='?tab=search'>
              <Button className='w-full'>Search for a note</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-14 flex flex-col justify-center items-center">
        {/* Landing tab... */}
        {tab === 'recent' && <RecentNotes />}
        {/* Add a note... */}
        {tab === 'add' && <AddANote /> }
        {/* Search for a note... */}
        {tab === 'search' && <SearchNote /> }
        {/* See all them notes baby... */}
        {tab === 'all' && <AllNotes />}
        </div>
    </div>
        
  )
}

export default Home