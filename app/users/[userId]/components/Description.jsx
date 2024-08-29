import React from 'react';
export default function Description({id}) {


    return (
        <div className='flex shadow flex-col mb-3'>
            <label className="bg-gray-400 rounded-t p-2 text-center font-bold text-black" htmlFor={id}>Description</label>
            <textarea
                className="p-4 rounded-b border border-gray-400 w-full focus:outline-none focus:border-blue-500"
                placeholder="Task Description..."
                id={id}
                rows="10"
                cols="">
            </textarea>
        </div>
    );
}