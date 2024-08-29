import React from 'react';

export default function SearchContainer({ className, inputClassName,placeholder }) {
    return (
        <div className={className}>
            <input type="text" className={inputClassName} placeholder={placeholder} />
        </div>
    );
}
