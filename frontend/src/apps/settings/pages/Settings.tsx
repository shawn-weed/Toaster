import { useLocation } from "react-router-dom"
import SettingsSidebar from "../components/SettingsSidebar"
import { useEffect, useState } from "react"
import SetAppearance from "../components/SetAppearance"
import SetLinks from "../components/SetLinks"
import SettingsHome from "../components/SettingsHome"

type Props = {}

export default function settingsHome({}: Props) {
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
    <div className="">
      <div className='absolute h-full left-0 bottom-0'>
        {/* Sidebar all tabs must have a margin of 64 on the left to account for the sidebar*/}
        <SettingsSidebar />
      </div>
      <div className=''>
        {/* settings home... */}
        {tab === 'home' && <SettingsHome />}
        {/* appearance... */}
        {tab === 'appearance' && <SetAppearance />}
        {/* links... */}
        {tab === 'links' && <SetLinks /> }
      </div>
    </div>
  )
}