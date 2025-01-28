import { Card } from "flowbite-react"
import { useEffect, useState } from "react"


type Props = {}


function Home({}: Props) {
  const [links, setLinks] = useState<any[]>([])

  const url: string = import.meta.env.VITE_API_URL + 'links/'

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setLinks(data))
  }, []);

  return (
      <div className="bg-[url('/homeImg.jpg')] bg-cover bg-center h-full">
        <div className="flex items-center justify-center">
          <h1 id='bannerText' className='mt-4 text-9xl text-center font-bangers w-full'>Tech Wiki</h1>
        </div>
        <div className='flex justify-center items-center ml-2 mr-2 gap-4'>
          <h2 id='homeText' className="text-6xl p-4 border-b-2 border-slate-500 mb-4 font-bangers">Links</h2>
        </div>
        <div className="flex justify-center m-2">
            <ul className="flex flex-wrap justify-center">
              {links.map(link => (
                <Card
                  id='card'
                  key={link.id}
                  className="h-48 w-96 m-2 items-center text-center">
                  <div className="gap-4">
                    <a id='cardt' className="font-bold text-2xl" href={`http://${link.url}`}>{link.title}</a> 
                  </div>
                  <p id='cardp' className="text-sm">{link.desc}</p>
                </Card>
              ))}
            </ul>
          </div>
      </div>
      
  )
}

export default Home