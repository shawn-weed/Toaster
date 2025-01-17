import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

type Props = {}


export default function SettingsSidebar({}: Props) {
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
    <Sidebar id='sidebar' className='pt-14' aria-label='Settings sidebar'>
      <Sidebar.Items className=''>
        <Sidebar.ItemGroup className='flex flex-col'>
            <Link to='/settings?tab=appearance'>
              <Sidebar.Item
                active={tab === 'appearance' || !tab}
                as='div'
              >
                Appearance
              </Sidebar.Item>
            </Link>
            <Link to='/settings?tab=links'>
              <Sidebar.Item
                active={tab === 'links' || !tab}
                as='div'
              >
                Home Page Links
              </Sidebar.Item>
            </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}