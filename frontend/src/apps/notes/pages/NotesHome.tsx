import { Button, Card, Datepicker, Textarea, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

type Props = {}

interface FormData {
  issue_title: string;
  device: string;
  date_of_occurance: string;
  tech: string;
  user: string;
  ticket_number: string;
  tech_notes: string;
}

function Home({}: Props) {
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [addHidden, setAddHidden] = useState<boolean>(true)
  const [formData, setFormData] = useState<FormData>({ issue_title: '', device: '', date_of_occurance: '', tech: '', user: '', ticket_number: '', tech_notes:''})
  const [date, setDate] = useState<Date | null>(null)

  const url = import.meta.env.VITE_API_URL + 'notes/'

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setRecentPosts(data))
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleDateChange = (date: Date) => {
    setDate(date);
    const isoDate = date.toISOString().slice(0, 10)
    setFormData({...formData, date_of_occurance: isoDate})
    
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

    try {
      const res = await axios.post(url, formData);
      //reset form data
      setFormData({
        issue_title: '',
        device: '',
        date_of_occurance: '',
        tech: '',
        user: '',
        ticket_number: '',
        tech_notes: ''
      })
      setDate(null)
      setAddHidden(true)
      console.log('Response:', res.data)
      fetch(url)
        .then(response => response.json())
        .then(data => setRecentPosts(data))
    } catch (error) {
      console.error('Error:', error);
    }
  }

return (
      <div className="m-2">
        <h1 className='text-6xl py-4 text-center'>Tech Notes</h1>
        <div className='flex justify-center ml-2 mr-2 gap-2'>
          <div className="w-1/2">
            <Button className='w-full' onClick={() => setAddHidden(!addHidden)}>{addHidden ? 'Add a note' : 'Hide'}</Button>
            <div className={addHidden ? 'hidden' : 'border-r-2 border-black'}>
              <form className="flex flex-wrap justify-between max-w-md gap-4 m-4" onSubmit={handleSubmit}>
                <TextInput placeholder="Title" name='issue_title' value={formData.issue_title} onChange={handleChange} required />
                <TextInput placeholder="Device" name='device' value={formData.device} onChange={handleChange} required />
                <Datepicker id='calender' name='date_of_occurance' value={date} onChange={(i) => {if(i) {handleDateChange(i)}}} required />
                <TextInput placeholder="Tech" name='tech' value={formData.tech} onChange={handleChange} required />
                <TextInput placeholder="User" name='user' value={formData.user} onChange={handleChange} required />
                <TextInput placeholder="Associated Ticket #" name='ticket_number' value={formData.ticket_number} onChange={handleChange} required />
                <Textarea placeholder='Notes here...' name='tech_notes' value={formData.tech_notes} onChange={handleChange} />
                <Button className='w-full' type="submit">Submit</Button>
              </form>
            </div> 
          </div>
          <div className="w-1/2">
            <Button className='w-full'>Search for a note</Button>
          </div>
        </div>
        <div>
          <h1 className="text-center mt-4 mb-4">Recent Notes</h1>
          <div className="flex justify-center">
            <ul className="flex flex-wrap justify-center max-w-xxl">
              {recentPosts.map(post => (
                <Card 
                  id='card'
                  key={post.id}
                  className="h-48 w-96 m-2 items-center text-center">
                  <div className="gap-4">
                    <h5 id='cardt' className="font-bold text-xl">{post.issue_title}</h5> 
                    <h5 className="text-xs">{post.date_of_occurance}</h5>
                  </div>
                  <p id='cardp' className="">{post.tech_notes}</p>
                  <div className="flex justify-center">
                    <Link to={'/notes/:' + post.id}>
                      <Button className="" type='button'>View Note</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </ul>
          </div>
        </div>
      </div>
        
  )
}

export default Home