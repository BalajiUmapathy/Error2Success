import React from 'react';
import styles from './Status.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
export default function StatusComp() {
  let name = "Widening of roads";
  let loc = "Chennai";
  let Status = "Ongoing";
  let date = "Wednesday";
  let des = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, culpa.";
 

  return (
    <div className={`${styles.stContainer} `}>
      <div className={`${styles.mod} shadow d-flex  align-items-center`}>
        <div className='col-9'>
          <div className='d-flex flex-row '>
            <h1>{name}</h1>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faLocationDot} />
              <p className='ml-2'>{loc}</p>
            </div>
            <p>{Status}</p>
          </div>
          <p>Deadline: {date}</p>
          <p>Description: {des}</p>
        </div>
        <div className='col-3 d-flex justify-content-center'>
          <button className="btn btn-success" >View</button>
        </div>
      </div>
    </div>
  );
}
