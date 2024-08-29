import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Resources({id,name}) {
    return (
        <div className='mt-4 flex shadow-xl flex-col mb-3  bg-white'>
            <label
                className="bg-gray-400 rounded-t p-2 text-center font-bold text-black"
                htmlFor={id}
            >
                {name}
            </label>
            <div
                className="flex justify-center items-center  rounded-b h-[300px] p-3 border border-gray-400 w-full focus:outline-none focus:border-blue-500 h-20"
                id={id}
            >
                <FontAwesomeIcon style={{ height: "50px",alignItems:"center",textAlign:"center" }} icon={faPlus} />
            </div>
        </div>
    );
}
