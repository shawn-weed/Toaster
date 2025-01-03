import { Button } from "flowbite-react"
import { Link } from "react-router-dom"

type Props = {}

function Home({}: Props) {

  return (
      <div className="">
        <h1 className='py-4'>Open Tech Management</h1>
        <div className='flex justify-center items-center ml-2 mr-2 gap-4'>
          <Link className='' to='/AssetMgmt'>
            <Button className='w-48 h-28 items-center'>Asset Management</Button>
          </Link>
          <Link className="" to='/notes'>
            <Button className='w-48 h-28 items-center'>Notes</Button>
          </Link>
        </div>
      </div>
  )
}

export default Home