import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function AllNotes({}: Props) {
  const [notes, setNotes] = useState<any[]>([])
  const url = import.meta.env.VITE_API_URL + 'notes/'

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setNotes(data))
    }, []);
    
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
              </Table.Row>
            ))}
          </Table.Body>
      </Table>
    </div>
  )
}