import { Button, Card } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function RecentNotes({}: Props) {
  const [recentPosts, setRecentPosts] = useState<any[]>([])

  const url = import.meta.env.VITE_API_URL + 'notes/'

  useEffect(() => {
    fetch(url + '?=10')
    .then(response => response.json())
    .then(data => setRecentPosts(data))
    }, []);

  return (
    <div className=''>
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
  )
}