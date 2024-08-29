"use client"
import React,{useState} from "react";
import Back from "@/components/Back"; 
import SearchContainer from "@/components/SearchContainer";
import SelectstatusComp from "@/components/SelectstatusComp";
import DateComp from "@/components/DateComp";
import Description from "@/components/Description";
import Resources from "@/components/Resources";
export default function Project() {
    return (
        <div className="AddProject p-2">
            <Back/>
            <SearchContainer
                className="pl-4  d-flex flex-row justify-content-center mt-2 mb-4"
                inputClassName="form-control shadow border border-black mr-3 search" placeholder="Add Project"
             />
             <div className="flex flex-row justify-around mb-3">
                 <SelectstatusComp/>
                 <DateComp id="fromID" labelCls="items-center bg-gray-400 p-2 font-bold text-black rounded-l addProjectlabel" labelText="From" />
                 <DateComp id="toID" labelCls="items-center bg-gray-400 p-2 font-bold text-black rounded-l addProjectlabel" labelText="To" />
             </div>
             <Description/>
             <div className="grid grid-cols-2 gap-4 p-4">
            <Resources id="resources1" name="Resources" />
            <Resources id="resources2" name="Images" />
            <Resources id="resources3" name="Tasks" />
            <Resources id="resources4" name="Updates" />
        </div>
            <div className="flex justify-center mb-4">
                <button className="btn btn-success h-50 w-25">Approve</button>
            </div>
        </div>
    );
}