"use client"; // Note that "use client" must be at the top of the file

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchContainer from "@/components/SearchContainer";
import SelectstatusComp from "@/components/SelectstatusComp";
import DateComp from "@/components/DateComp";
export default function SearchBar() {
    const router = useRouter();
    const [status, setStatus] = useState("Active");

    const next = () => {
        router.push("./Addproject");
    };

    return (
        <div className="p-3 search-container">
            <div className='d-flex flex-row justify-content-end'>
                <button className="btn btn-primary" onClick={next}>Add project</button>
            </div>
            <div className="mt-12 row  d-flex justify-content-center pt-5">
                <div className="col-12 col-md-7 d-flex justify-content-center">
                    <SearchContainer
                        className="pl-4 w-100 d-flex justify-content-center"
                        inputClassName="form-control mr-3 search"
                        placeholder="Enter project name"
                    />
                </div>
                <div className="col-12 col-md-5 d-flex justify-content-center mt-3 mt-md-0">
                    <SelectstatusComp />
                    <DateComp />
                </div>
            </div>
        </div>
    );
}
