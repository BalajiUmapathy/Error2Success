"use Client"
import React,{useState} from 'react';

export default function SelectstatusComp() {

  const [status, setStatus] = useState("Active");
  return (

    <select
        className="flex form-control ssd-search mr-2"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
    >
        <option value="inActive">Completed</option>
        <option value="Active">Ongoing</option>
        <option value="Pending">Pending</option>
    </select>
  );
}
