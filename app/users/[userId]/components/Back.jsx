import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Back() {
    const router = useRouter();

    const backToProject = () => {
        router.push("./project");
    };

    return (
        <div>
        <FontAwesomeIcon style={{height:"30px",paddingLeft:"20px",marginTop:"13px"}} onClick={backToProject}  icon={faArrowLeft} />
        </div>
    );

}