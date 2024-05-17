// In SchoolCommunications.js
import React, { useState, useEffect } from 'react';
import CommuniqueService from "../../../services/communique_service"
import CommunicationsList from "./communique_list";
import { useParams } from "react-router-dom";

export default function SchoolCommunications () {
    const [communques , setCommuniques] = useState([])
    const params = useParams()

    useEffect(() => {
        fetchCommunications();
    }, [params['schoolID']]);

    const fetchCommunications = async () => {
        try {
            const response = await CommuniqueService.getCommuniques(params['schoolID']);
            setCommuniques(response);
            console.log(response)
        } catch (error) {
            console.error('Error fetching communications:', error);
        }
    };

    const fetchUpdatedCommunications = async () => {
        // Fetch updated communication data after adding a new communication
        await fetchCommunications();
    };

    return (
        <div className="ml-44 mr-3 mt-20">
            <CommunicationsList communications={communques} fetchUpdatedData={fetchUpdatedCommunications} />
        </div>
    );
}
