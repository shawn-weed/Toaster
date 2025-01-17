import axios from 'axios';
import { Button, Datepicker, Modal, Textarea, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { GiPlainArrow } from "react-icons/gi";

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

export default function AddANote({}: Props) {
      const [formData, setFormData] = useState<FormData>({ issue_title: '', device: '', date_of_occurance: '', tech: '', user: '', ticket_number: '', tech_notes:'' })
      const [date, setDate] = useState<Date | null>(null)
      const [dateError, setDateError] = useState<boolean>(false)
      const [error, setError] = useState<boolean>(false)
      const [errorMessage, setErrorMessage] = useState<string>('')
      const [showModal, setShowModal] = useState<boolean>(false)

      const url = import.meta.env.VITE_API_URL + 'notes/'

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({...prev, [name]: value}))
      }

      const handleDateChange = (date: Date) => {
        const today = new Date()
        if (date > today){
          setDateError(true)
          setDate(date)
          setFormData({...formData, date_of_occurance:''})
        } else {
          setDateError(false)
          setDate(date)
          const isoDate = date.toISOString().slice(0, 10)
          setFormData({...formData, date_of_occurance: isoDate})
        }
      };

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
          const res = await axios.post(url, formData);
          //reset form data
          if (res.status === 200 || res.status === 201) {
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
            setShowModal(true)
          } else {
            setError(true)
            setErrorMessage(res.statusText)
          }
        } catch (error) {
          console.error('Error:', error);
          setError(true)
          setErrorMessage((error as Error).message)}
      }

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-center font-bangers text-7xl mb-4'>New Note</h1>
        <GiPlainArrow id='arrow2' className='text-7xl mb-2'/>
      </div>
      <form className="flex flex-wrap justify-between max-w-md gap-4 m-4 pb-4" onSubmit={handleSubmit}>
        <TextInput placeholder="Title" name='issue_title' value={formData.issue_title} onChange={handleChange} required />
        <TextInput placeholder="Device" name='device' value={formData.device} onChange={handleChange} />
        <Datepicker id='calender' name='date_of_occurance' value={date} onChange={(i) => {if(i) {handleDateChange(i)}}} required />
        <TextInput placeholder="Tech" name='tech' value={formData.tech} onChange={handleChange}  />
        <TextInput placeholder="User" name='user' value={formData.user} onChange={handleChange}  />
        <TextInput placeholder="Associated Ticket #" name='ticket_number' value={formData.ticket_number} onChange={handleChange}  />
        <Textarea placeholder='Notes here...' name='tech_notes' value={formData.tech_notes} onChange={handleChange} required/>
        <h5 className={dateError ? 'text-red-500' : 'hidden'}>Date can not be after today!</h5>
        <Button className='w-full' disabled={dateError} type="submit">Submit</Button>
      </form>
      {/* Error Modal */}
      <Modal show={error} onClose={() => [setError(false), setErrorMessage('')]} popup size='md'>
          <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="'mb-5 text-lg text-red-500 dark:text-red-400">
                  Unable to add. Error below
                </h3>
                <h4>
                  {errorMessage}
                </h4>
                <div className="flex justify-center gap-4 mt-5">
                  <Button color='gray' onClick={() => [setError(false), setErrorMessage('')]}>
                    Close
                  </Button>
                </div>
              </div>
            </Modal.Body>
        </Modal>
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="'mb-5 text-lg text-green-500 dark:text-green-400">
                  Success
                </h3>
                <h4>
                  Your note was added
                </h4>
                <div className="flex justify-center gap-4 mt-5">
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </Modal.Body>
        </Modal>
      </>
  )
}