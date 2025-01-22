import { useEffect, useState } from 'react'
import axios from "axios";
import { Button, Modal, Table, Textarea, TextInput } from 'flowbite-react';
import { FaRegTrashCan } from "react-icons/fa6"


type Props = {}

interface FormData {
  title: string;
  url: string;
  desc: string;
}
export default function SetLinks({}: Props) {
  const [edit, setEdit] = useState<string>('')
  const [idToDelete , setIdToDelete] = useState<number>()
  const [showModal, setShowModal] = useState(false); 
  const [addHidden, setAddHidden] = useState<boolean>(true)
  const [links, setLinks] = useState<any[]>([])
  const [formData, setFormData] = useState<FormData>({
    title: '',
    url: '',
    desc: '',
  })
  const [editFormData, setEditFormData] = useState<FormData>({
    title: '',
    url: '',
    desc: '',
  })
  const [initialData, setInitialData] = useState<FormData>({
    title: '',
    url: '',
    desc: '',
  })

  const url: string = import.meta.env.VITE_API_URL + 'links/' 

    useEffect(() => {
        const getLinks = async () => {
            try {
                const res = await axios.get(url)
                setLinks(res.data);             
            } catch(error) {
                console.error('Error:', error)
            }
        };
        getLinks();
        
    }, [])  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({...prev, [name]: value}))     
    }

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      
      // sanitizes input of url field to ensure there are no spaces
      if (name !== 'url') {
        setEditFormData((prev) => ({...prev, [name]: value}))
      } else {
        setEditFormData((prev) => ({...prev, [name]: value.replace(/\s/g, '')}))
      }    
    }  

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        const res = await axios.post(url, formData);
        //reset form data
        setFormData({
          title: '',
          url: '',
          desc: ''
        })
        setAddHidden(true)
        console.log('Response:', res.data)
        fetch(url)
          .then(response => response.json())
          .then(data => setLinks(data)) 
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  
      try {
        const res = await axios.put(url + edit + '/', editFormData);
        //reset form data
        setEditFormData({
          title: '',
          url: '',
          desc: ''
        })
        setEdit('')
      
        console.log('Response:', res.data)
        fetch(url)
          .then(response => response.json())
          .then(data => setLinks(data)) 
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      setEditFormData(initialData)
      setEdit('')
    }

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      
      try {
        const res = await axios.delete(url + idToDelete + '/')
        console.log('Response:', res.data)
        fetch(url)
          .then(response => response.json())
          .then(data => setLinks(data)) 
      } catch (error) {
        console.error('Error:', error);
      }
    }

  return (
    <div className='ml-64'>
      <div className='mt-8'>
        <h1 className='font-bangers text-center'>Home Page Links</h1>
        <div className='table-auto overflow-x-scroll md:mx-auto p-4 scrollbar scrollbar-track-gray-300 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-600 dark:scrollbar-thumb-gray-700'>
          <Table  hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>URL</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>
                <span className='sr-only'>Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className='sr-only'>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              
                {links.map(link => (
                    <Table.Row key={link.id} className=''>
                      {edit === link.id ? 
                        <>
                          <Table.Cell>
                            <TextInput value={editFormData.title} name='title' onChange={handleEdit} />
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput value={editFormData.url} name='url' onChange={handleEdit} /> 
                          </Table.Cell>
                          <Table.Cell className='flex w-full'>
                            <Textarea className='resize' value={editFormData.desc} name='desc' onChange={handleEdit} />
                          </Table.Cell>
                          <Table.Cell>
                            <Button type='button' onClick={handleSave}>
                              Save
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button type='button' onClick={handleCancel}>
                              Cancel
                            </Button>
                          </Table.Cell>
                        </>
                    :
                        <>
                          <Table.Cell>{link.title}</Table.Cell>
                            <Table.Cell><a href={link.url}>{link.url}</a></Table.Cell>
                            <Table.Cell>{link.desc}</Table.Cell>
                          <Table.Cell>
                            <Button type='button' onClick={() => [setEditFormData({
                                                      title: link.title,
                                                      url: link.url,
                                                      desc: link.desc
                                                      }), setEdit(link.id),
                                                      [setInitialData({
                                                        title: link.title,
                                                        url: link.url,
                                                        desc: link.desc
                                                        })
                                                  ]]}
                            >
                              Edit
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button 
                              type='button' 
                              onClick={() => {setIdToDelete(link.id); setShowModal(true)}}
                              className='bg-transparent enabled:hover:bg-transparent enabled:hover:transparent'
                            >  
                              <FaRegTrashCan size='20' className='text-red-500 dark:text-red-700'/>
                            </Button>
                          </Table.Cell>
                        </>
                    }
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Button className='ml-4 mb-8 min-w-36' onClick={() => setAddHidden(!addHidden)}>{addHidden ? 'Add a link' : 'Hide'}</Button>
      <div className={addHidden ? 'hidden' : ''}>
        <form className='flex flex-col gap-2 m-4 max-w-md border-t-2 pt-8 border-black dark:border-amber-50' onSubmit={handleSubmit}>
        <TextInput placeholder='Title' name='title' value={formData.title} onChange={handleChange} required />
        <TextInput placeholder='URL' name='url' value={formData.url} onChange={handleChange} required />
        <Textarea placeholder='Description here...' name='desc' value={formData.desc} onChange={handleChange} required />
        <div className='flex gap-2'>
          <Button className='w-1/2' type="submit">Add Link</Button>
          <Button className='w-1/2' type="button" onClick={() => setFormData({title:'',
                                                                              url:'',
                                                                              desc:'' 
                                                                              })}
          >
            Clear
          </Button>
        </div>
        </form>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="'mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to remove this link?
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