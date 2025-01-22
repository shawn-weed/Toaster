import { Button, Modal, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6"
import axios from 'axios';

type Props = {}

export default function AllNotes({}: Props) {
  const [notes, setNotes] = useState<any[]>([])
  const [idToDelete , setIdToDelete] = useState<number>()
  const [showModal, setShowModal] = useState(false); 

  const url = import.meta.env.VITE_API_URL + 'notes/'

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setNotes(data))
    }, []);
    
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      
      try {
        const res = await axios.delete(url + idToDelete + '/')
        console.log('Response:', res.data)
        fetch(url)
          .then(response => response.json())
          .then(data => setNotes(data)) 
      } catch (error) {
        console.error('Error:', error);
      }
    }

  return (
    <div className=''>
    <h2 className='font-bangers text-5xl mb-6 text-center'>All the notes</h2>
      <Table className=''>
        <Table.Head>
            <Table.HeadCell>
                Title
            </Table.HeadCell>
            <Table.HeadCell>
                Date
            </Table.HeadCell>
            <Table.HeadCell>
                Tech
            </Table.HeadCell>
            <Table.HeadCell>
                User
            </Table.HeadCell>
            <Table.HeadCell>
                Ticket
            </Table.HeadCell>
            <Table.HeadCell>
                Device
            </Table.HeadCell>
            <Table.HeadCell>
                Notes
            </Table.HeadCell>
            <Table.HeadCell>
                View
            </Table.HeadCell>
            <Table.HeadCell>
                Delete
            </Table.HeadCell>
        </Table.Head>
        <Table.Body>
            {notes.map(note => (
              <Table.Row key={note.id} className=''>
                <Table.Cell>
                  {note.issue_title}
                </Table.Cell>
                <Table.Cell>
                  {note.date_of_occurance}
                </Table.Cell>
                <Table.Cell >
                  {note.tech}
                </Table.Cell>
                <Table.Cell>
                  {note.user}
                </Table.Cell>
                <Table.Cell>
                  {note.ticket}
                </Table.Cell>
                <Table.Cell>
                  {note.device}
                </Table.Cell>
                <Table.Cell>
                  {note.notes}
                </Table.Cell>
                <Link to={'/notes/:' + note.id}>
                <Button className='bg-transparent enabled:hover:bg-transparent enabled:hover:transparent dark:bg-transparent dark:enabled:hover:bg-transparent dark:enabled:hover:transparent'>
                  <Table.Cell>
                    <FaEye />
                  </Table.Cell>
                </Button>
                </Link>
                <Table.Cell>
                  <Button
                    type='button' 
                    onClick={() => {setIdToDelete(note.id); setShowModal(true)}} 
                    className='bg-transparent enabled:hover:bg-transparent enabled:hover:transparent dark:bg-transparent dark:enabled:hover:bg-transparent dark:enabled:hover:transparent'>
                  <FaRegTrashCan className='text-red-500 dark:text-red-700'/>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
      </Table>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="'mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this note?
                </h3>
                <div className="flex justify-center gap-4 mt-5">
                  <Button color='failure' onClick={(event) => {handleDelete(event); setShowModal(false)}}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </div>
  )
}