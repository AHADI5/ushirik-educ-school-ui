import React from 'react';
import { DialogTitle, DialogContent, Accordion, AccordionSummary, AccordionDetails, Typography, Card, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function YearDetails({ year, format }) {
    if (!year) {
        return null; // Return nothing if no year is selected
    }

    return (
        <>
            <DialogTitle>{year.schoolYear}</DialogTitle><DialogContent>
                {year.semestersList && year.semestersList.length > 0 ? (
                    year.semestersList.map((semester, semesterIndex) => (
                        <Accordion key={semesterIndex}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Semestre {semesterIndex + 1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Date de début: {format(semester.startingDate)}</Typography>
                                <Typography>Date de fin: {format(semester.endingDate)}</Typography>

                                {semester.periodInSemesterList && semester.periodInSemesterList.length > 0 ? (
                                    semester.periodInSemesterList.map((period, periodIndex) => (
                                        <Card key={periodIndex} sx={{ p: 2, mb: 2, boxShadow: 1 }}>
                                            <Typography variant="subtitle2">
                                                Période {periodIndex + 1}
                                            </Typography>
                                            <Typography>Date de début: {format(period.startingDate)}</Typography>
                                            <Typography>Date de fin: {format(period.endingDate)}</Typography>
                                        </Card>
                                    ))
                                ) : (
                                    <Typography variant="body2">Pas de périodes disponibles.</Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Typography variant="body2">Pas de semestres disponibles.</Typography>
                )}
            </DialogContent></>
    );
}
