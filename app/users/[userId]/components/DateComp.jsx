import React from 'react';

export default function DateComp({id,labelCls,labelText}) {
    return (
    <>
        <label for={id} className={labelCls}>{labelText}</label>
        <input type='date' className='pl-3 mr-2 form-control ssd-search'
        id={id} />
    </>
    );
}