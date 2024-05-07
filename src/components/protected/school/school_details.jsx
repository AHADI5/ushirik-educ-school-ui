import React from 'react';
import useSchoolData from "../../../services/school_";

export default function SchoolInformation() {
    const { School } = useSchoolData(52); // Assuming useSchoolData is a custom hook to fetch school data

    // Handle case when data is still being fetched
    if (School.length === 0) {
        return <p>Loading...</p>;
    }

    // Data has been fetched, render the component
    return (
        <div className="mt-16 ml-64">
            <p>Name: {School.name}</p>
            <p>Email: {School.email}</p>
            <p>School ID: {School.schoolID}</p>
            <p>Director: {School.director.name}</p>
            <p>Director Address:</p>
            <ul>
                <li>Quarter: {School.director.address.quarter}</li>
                <li>Avenue: {School.director.address.avenue}</li>
                <li>House Number: {School.director.address.houseNumber || "Not available"}</li>
            </ul>
            <p>School Address:</p>
            <ul>
                <li>Quarter: {School.address.quarter}</li>
                <li>Avenue: {School.address.avenue}</li>
                <li>House Number: {School.address.houseNumber || "Not available"}</li>
            </ul>
        </div>
    );
}
