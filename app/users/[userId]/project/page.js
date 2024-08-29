"use client";  // This ensures client-side rendering for this component

import React from "react";
  

import Searchbar from "@/components/Searchbar";
import StatusComp from "@/components/StatusComp"; 

export default function Project() {
    return (
        <div>
            <Searchbar />
            <StatusComp />
        </div>
    );
}
