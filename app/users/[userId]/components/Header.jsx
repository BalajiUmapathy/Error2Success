import React from 'react';


export default function Header() {
    return (
        <header className="head d-flex justify-content-between align-items-center p-4">
            <h1 className='pl-15 col-7 text-center'>DEPARTMENT OF PUBLIC WORKS</h1>
            <div className=' head-img-btn-cont col-5 d-flex flex-row justify-content-end'>
                
            <img src='https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-man-default-avatar-png-image_2813122.jpg' className='rounded-full head-profile' />
                <div className='d-flex flex-column justify-content-center'>
                <button className='btn btn-danger ml-3'>Log out</button>
                </div>
            </div>
        </header>
    );
}

