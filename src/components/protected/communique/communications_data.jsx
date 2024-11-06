// In SchoolCommunications.js
import React, { useState, useEffect } from 'react';
import CommuniqueService from "../../../services/communique_service";
import CommunicationsList from "./communique_list";
import { useParams } from "react-router-dom";
import { School, Announcement } from '@mui/icons-material'; // Importing Material Icons
import { Container, Typography, Grid } from '@mui/material'; // Importing MUI components

export default function SchoolCommunications () {
    const [communques, setCommuniques] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetchCommunications();
    }, [params['schoolID']]);

    const fetchCommunications = async () => {
        try {
            const response = await CommuniqueService.getCommuniques(params['schoolID']);
            setCommuniques(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching communications:', error);
        }
    };

    const fetchUpdatedCommunications = async () => {
        // Fetch updated communication data after adding a new communication
        await fetchCommunications();
    };

    return (
        <Container maxWidth="lg" sx={{ml  : 20  ,  mt: 4, mb: 2 }}>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Grid item>
                    <School fontSize="large" sx={{ color: 'primary.main' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
                        Communications de l'École
                    </Typography>
                </Grid>
                <Grid item>
                    <Announcement fontSize="large" sx={{ color: 'primary.main' }} />
                </Grid>
            </Grid>
            <CommunicationsList communications={communques} fetchUpdatedData={fetchUpdatedCommunications} />
        </Container>
    );
}
