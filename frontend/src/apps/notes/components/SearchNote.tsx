import axios from 'axios'
import { Button, Card, TextInput, Tooltip } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GiPlainArrow } from "react-icons/gi"
import { GiSadCrab } from "react-icons/gi"



type Props = {}

export default function SearchNote({}: Props) {
      const [searchForm, setSearchForm] = useState<string>('')
      const [searchResults, setSearchResults] = useState<any[]>([])
      const [areThereResults, setAreThereResults] = useState<boolean>(false)
      const [error, setError] = useState<string | null>(null)
      const [dateError, setDateError] = useState<boolean>(false)
      const [noResults, setNoResults] = useState<boolean>(false)
      const timerId = useRef<any>(null)


      const url = import.meta.env.VITE_API_URL + 'notes/'

      const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearTimeout(timerId.current)
        setAreThereResults(false)
        setSearchResults([])
        try {
          const res = await axios.get(url, { 
            params: {search: searchForm}
          });
          if (res.statusText === 'OK') {
          //reset form data
          setSearchForm('')
          setSearchResults(res.data)
            if (res.data.length !== 0){
              setAreThereResults(true)
            } else {
              setAreThereResults(false)
              setNoResults(true)
              timerId.current = setTimeout(() => {
                setNoResults(false)
              }, 3000);
            }  
          } else {
            setError(res.statusText)
            setAreThereResults(false)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

  return (
    <>
      <div className='mb-4'>
        <form className="flex gap-4" onSubmit={handleSearch}>
          <Tooltip content="Use YYYY-MM-DD for dates" animation="duration-1000">
            <TextInput placeholder="Search details..." name='issue_title' className='w-96' value={searchForm} onChange={(e) => setSearchForm(e.target.value)} required />
          </Tooltip>
            {/* <Datepicker id='calender' name='date_of_occurance' value={date} onChange={(i) => {if(i) {handleDateChange(i)}}} required /> */}
            <h5 className={dateError ? 'text-red-500' : 'hidden'}>Date can not be after today!</h5>
            <Button className='' disabled={dateError} type="submit">Search</Button>
        </form>
      </div>
      <div className={areThereResults ? 'hidden' : 'flex flex-col items-center'}>
        <GiPlainArrow id='arrow' className={noResults ? 'invisible' : 'text-8xl mb-2 p-4'} />
        <div className='flex justify-between items-end gap-10'>
        <h1 className='text-center font-bangers text-7xl mb-4'>{noResults ? 'No Results' : 'Search Here'}</h1>
        <GiSadCrab className={noResults ? 'text-center text-9xl text-red-700' : 'hidden'}/>
        </div>
      </div>
      <div className={ areThereResults ? 'flex flex-col justify-center items-center' : 'hidden'}>
        <h1 className="text-center mt-4 font-bangers">Search Results</h1>
        <GiPlainArrow id='arrow2' className='text-8xl text-center p-4'/>
        <h2 className={error ? 'text-red-500' : 'hidden'}>Error: {error}</h2>
        <div className={areThereResults ? "flex justify-center" : 'hidden'}>
          <ul className="flex flex-wrap justify-center max-w-screen">
            {searchResults.map(result => (
              <Card 
                id='card'
                key={result.id}
                className="h-48 w-96 m-2 items-center text-center">
                <div className="gap-4">
                  <h5 id='cardt' className="font-bold text-xl">{result.issue_title}</h5> 
                  <h5 className="text-xs">{result.date_of_occurance}</h5>
                </div>
                <p id='cardp' className="">{result.tech_notes}</p>
                <div className="flex justify-center">
                  <Link to={'/notes/:' + result.id}>
                    <Button className="" type='button'>View Note</Button>
                  </Link>
                </div>
                </Card>
              ))}
            </ul>
        </div>
      </div>
    </>
  )
}