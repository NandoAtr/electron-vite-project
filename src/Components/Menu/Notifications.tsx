import React, {useEffect} from 'react'
import { axiosPrivate } from '../../Common/http/axiosPrivate';

type note = {
  title: string;
  descriptions: string;
}


const Notifications = () => {

  const [notes, setNotes] = React.useState([])

  React.useEffect(() => {
  
    (
      async()=>{
        const response = await axiosPrivate.get('notes')
        setNotes(response.data)
      }  
    )()
  
  }, [])

  return (
      <div
        className=" absolute top-[100%] right-20 z-50 px-4 py-6 w-64 bg-white border-r-2 border-indigo-100 shadow-lg sm:right-[9%] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl sm:w-72 lg:absolute lg:w-[25%]"
      >
        <h2 className="text-xl mb-6">Notifications</h2>
        <div>
          {notes.map((note:note)=>(
            <div 
              className='p-[10px] shadow-lg rounded-md text-center'
              key={note.title}
            >
              <h2 className='mt-4 border-b-2 border-black-500 text-lg font-bold '>{note.title}</h2>
              <p className='text-left mt-5 px-1 mb-2'>{note.descriptions}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Notifications