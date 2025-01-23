import React, { useEffect, useState } from 'react'

interface IAsset {
    serial_number: string
    asset_type: string
    status: string
    asset_id: string
    location: string
    model: string
}

const AssetSearch: React.FC = () => {
  const [assetList, setAssetList] = useState<IAsset[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {  
    const getAssets = async () => {
      try {  
        const res = await fetch('http://localhost:8000/assetmanagement/')
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await res.json()
        setAssetList(jsonData)
      }catch(err: any) {
        setError(err.message)
        return error
      }
  }
    getAssets()
  }, [])
  return (
    <div>
      {assetList?.map((item) => (
        <li key={item.serial_number}>{item.asset_type} - {item.status} - {item.location} - {item.model}</li>
      ))}
    </div>
  )
}

export default AssetSearch