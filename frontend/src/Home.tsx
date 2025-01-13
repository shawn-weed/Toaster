import { Button } from "flowbite-react"
import { Link } from "react-router-dom"

type Props = {}

function Home({}: Props) {

  return (
      <div className="">
        <h1 className='text-6xl py-4 text-center'>Tech Wiki</h1>
        <div className="overflow-hidden block flex-shrink-0 w-full">
          <img className="max-h-48 min-w-full border-4 border-slate-700 dark:border-slate-200 rounded shadow-xl object-cover" src="./src/assets/homeImg.jpg" />
        </div>
        <div className='flex justify-center items-center ml-2 mr-2 gap-4'>
          <h2 className="text-4xl p-4 border-b-2 border-slate-500">Tech Links</h2>
        </div>
      </div>
  )
}

export default Home