import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

type Props = {}

interface Data {
  issue_title: string;
  device: string;
  date_of_occurance: string;
  tech: string;
  user: string;
  ticket_number: string;
  tech_notes: string;
}
export default function NotePage({}: Props) {
  const { id }: any = useParams();
  const key = id.slice(1)

  
  const [data, setData] = useState<Data>({
    issue_title: '',
    device: '',
    date_of_occurance: '',
    tech: '',
    user: '',
    ticket_number: '',
    tech_notes: ''})
  const url: string = import.meta.env.VITE_API_URL + 'notes/'

  useEffect(() => {
    const getNote = async () => {
      try {
          const res = await axios.get(url+key+ '/')
          setData(res.data)
          console.log(data);
          
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getNote();
    }, [])
  
    return (
    <div className="flex flex-col m-10 justify-center items-center">
      <h1 className="text-6xl text-center font-bangers m-8">Here is your note...</h1>
      <Card className="">
        <h2 className="text-2xl text-center mt-10 font-bold">{data.issue_title}</h2>
        <div className="flex flex-wrap justify-center gap-10 items-center mt-4 border-b-2 pb-2">
          <div className="flex text-center justify-center gap-2">
            <h4 className="font-bold">Date: </h4>
            <h4 className="text-center italic">{data.date_of_occurance}</h4>
          </div>
          <div className="flex text-center justify-center gap-2">
            <h4 className="font-bold">Tech: </h4>
            <h4 className="text-center italic">{data.tech}</h4>
          </div>
          <div className="flex text-center justify-center gap-2">
            <h4 className="font-bold ">User: </h4>
            <h4 className="text-center italic">{data.user}</h4>
          </div>
          <div className="flex text-center justify-center gap-2">
            <h4 className="font-bold">Ticket: </h4>
            <h4 className="text-center italic">{data.ticket_number}</h4>
          </div>
          <div className="flex text-center justify-center gap-2">
            <h4 className="font-bold">Device: </h4>
            <h4 className="text-center italic">{data.device}</h4>
          </div>
        </div>
        <h5 className="m-2 font-bold">Notes:</h5>
        <p className="ml-4">{data.tech_notes}</p>
      </Card>
    </div>
  )
}