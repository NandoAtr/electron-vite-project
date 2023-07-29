import React from 'react'

export const Email = () => {
  return (
    <form className=" bg-white w-full px-4 rounded py-8 text-left overflow-hidden">
        <div className="w-full shadow rounded py-2 lg:px-4">
            <div className="md:w-full flex flex-col">
                <label className="text-base font-semibold leading-none text-gray-800 ">Assunto</label>
                <input 
                    type="name" 
                    className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" 
                    placeholder="Please input  name" 
                />
            </div>
            <div className="w-full flex flex-col mt-8">
                <label 
                    className="text-base font-semibold leading-none text-gray-800 "
                >
                    Message
                </label>
                <textarea 
                    className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
                >
                </textarea>
            </div>
            <div className="flex items-center justify-center w-full">
                <button 
                    className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
                >
                    Enviar
                </button>
            </div>
        </div>
    </form>
  )
}
