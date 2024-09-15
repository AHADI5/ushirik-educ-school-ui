import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Grid, IconButton, CircularProgress, Fab, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import CircleIcon from '@mui/icons-material/Circle';
import { getSchoolYears, registerSchoolYears, startSchoolYear, endSchoolYear, updateSchoolYear } from '../../../services/school_service';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import YearDetails from './years_details';

const formatDate = (date) => dayjs(date).format('DD/MM/YYYY');
const createNewSemester = () => ({
  startingDate: '',
  endingDate: '',
  periods: [createNewPeriod()]
});

const createNewPeriod = () => ({
  startingDate: '',
  endingDate: ''
});

export default function SchoolYearManagement() {
  const { schoolID } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [schoolYears, setSchoolYears] = useState([]);
  const [newSchoolYears, setNewSchoolYears] = useState([{
    schoolYear: '',
    startingDate: '',
    endingDate: '',
    semesters: [createNewSemester()]
  }]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpenDetails = (year) => {
    setSelectedYear(year);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedYear(null);
  };

  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const fetchedSchoolYears = await getSchoolYears(schoolID);
        setSchoolYears(Array.isArray(fetchedSchoolYears) ? fetchedSchoolYears : []);
      } catch (error) {
        console.error('Failed to fetch school years', error);
      }
    };
    fetchSchoolYears();
  }, [schoolID]);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setNewSchoolYears([{
      schoolYear: '',
      startingDate: '',
      endingDate: '',
      semesters: [createNewSemester()]
    }]);
    setSelectedYear(null);
  };

  const handleAddSchoolYear = () => {
    setNewSchoolYears((prevYears) => [
      ...prevYears,
      {
        schoolYear: '',
        startingDate: '',
        endingDate: '',
        semesters: [createNewSemester()]
      }
    ]);
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    try {
      if (selectedYear) {
        // Update a specific year if selected
        await updateSchoolYear(selectedYear.schoolYearID, newSchoolYears[0]);
      } else {
        // Check if you want to add another year before submitting
        if (newSchoolYears.length === 0) {
          handleAddSchoolYear(); // Add a school year if no entries exist
        }

        // Register multiple school years
        await registerSchoolYears(schoolID, newSchoolYears);
      }

      // Fetch and update the list of school years after saving
      const updatedSchoolYears = await getSchoolYears(schoolID);
      setSchoolYears(Array.isArray(updatedSchoolYears) ? updatedSchoolYears : []);
      handleCloseForm();  // Close the form after submission
    } catch (error) {
      console.error('Failed to save school years', error);
    } finally {
      setFormLoading(false);  // Stop the loading indicator
    }
  };

  const handleStartSchoolYear = async (schoolYearID) => {
    try {
      await startSchoolYear(schoolYearID);
      const updatedSchoolYears = await getSchoolYears(schoolID);
      setSchoolYears(Array.isArray(updatedSchoolYears) ? updatedSchoolYears : []);
    } catch (error) {
      console.error('Failed to start the school year', error);
    }
  };

  const handleEndSchoolYear = async (schoolYearID) => {
    try {
      await endSchoolYear(schoolYearID);
      const updatedSchoolYears = await getSchoolYears(schoolID);
      setSchoolYears(Array.isArray(updatedSchoolYears) ? updatedSchoolYears : []);
    } catch (error) {
      console.error('Failed to end the school year', error);
    }
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setNewSchoolYears([{
      schoolYear: year.schoolYear,
      startingDate: dayjs(year.startingDate).format('YYYY-MM-DD'),
      endingDate: dayjs(year.endingDate).format('YYYY-MM-DD'),
      semesters: year.semestersList.map(semester => ({
        startingDate: dayjs(semester.startingDate).format('YYYY-MM-DD'),
        endingDate: dayjs(semester.endingDate).format('YYYY-MM-DD'),
        periods: semester.periodInSemesterList.map(period => ({
          startingDate: dayjs(period.startingDate).format('YYYY-MM-DD'),
          endingDate: dayjs(period.endingDate).format('YYYY-MM-DD')
        }))
      })) || [createNewSemester()]
    }]);
    setOpenForm(true);
  };

  const handleInputChange = (event, yearIndex, key) => {
    const { value } = event.target;
    setNewSchoolYears((prevYears) => {
      const updatedYears = [...prevYears];
      updatedYears[yearIndex][key] = value;
      return updatedYears;
    });
  };

  const handleSemesterChange = (event, yearIndex, semesterIndex, key) => {
    const { value } = event.target;
    setNewSchoolYears((prevYears) => {
      const updatedYears = [...prevYears];
      updatedYears[yearIndex].semesters[semesterIndex][key] = value;
      return updatedYears;
    });
  };

  const handlePeriodChange = (event, yearIndex, semesterIndex, periodIndex, key) => {
    const { value } = event.target;
    setNewSchoolYears((prevYears) => {
      const updatedYears = [...prevYears];
      updatedYears[yearIndex].semesters[semesterIndex].periods[periodIndex][key] = value;
      return updatedYears;
    });
  };

  const handleAddSemester = (yearIndex) => {
    setNewSchoolYears((prevYears) => {
      const updatedYears = [...prevYears];
      updatedYears[yearIndex].semesters.push(createNewSemester());
      return updatedYears;
    });
  };

  const handleAddPeriod = (yearIndex, semesterIndex) => {
    setNewSchoolYears((prevYears) => {
      const updatedYears = [...prevYears];
      updatedYears[yearIndex].semesters[semesterIndex].periods.push(createNewPeriod());
      return updatedYears;
    });
  };

  return (
    <Box sx={{ p: 2, ml: 25 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Années Scolaires
      </Typography>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenForm}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      <Grid container spacing={3}>
        {/* Années Scolaires en Cours */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Années Scolaires en Cours
          </Typography>
          <Grid container spacing={2} sx={{ overflow: 'auto', maxHeight: '400px', width: '150rem' }}>
            {schoolYears
              .filter((year) => year.schoolYearStatus === 'PROGRESS')
              .map((year) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={year.schoolYearID}>
                  <Card sx={{ p: 2, boxShadow: 3, border: '1px solid #4caf50' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircleIcon sx={{ color: '#4caf50', fontSize: 20, mr: 2 }} />
                      <Typography variant="h6" color="primary">
                        {year.schoolYear}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Début: {formatDate(year.startingDate)} - Fin: {formatDate(year.endingDate)}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEndSchoolYear(year.schoolYearID)}
                      >
                        Clôturer Année Scolaire
                      </Button>
                      <IconButton
                        color="primary"
                        onClick={() => handleYearClick(year)}
                        sx={{ ml: 2 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDetails(year)}
                        sx={{ ml: 2 }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>





        {/* Autres Années Scolaires */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Autres Années Scolaires
          </Typography>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Grid container spacing={2}>
              {schoolYears.filter(year => year.schoolYearStatus !== 'PROGRESS').map((year) => (
                <Grid item xs={12} sm={6} md={4} key={year.schoolYearID}>
                  <Card sx={{ p: 2, boxShadow: 1, border: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircleIcon sx={{ color: year.schoolYearStatus === 'ENDED' ? 'gray' : 'blue', fontSize: 20, mr: 2 }} />
                      <Typography variant="h6" color={year.schoolYearStatus === 'ENDED' ? 'textSecondary' : 'textPrimary'}>
                        {year.schoolYear}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Début: {formatDate(year.startingDate)} - Fin: {formatDate(year.endingDate)}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      {year.schoolYearStatus === 'ENDED' ? (
                        <Typography variant="body2" color="textSecondary">
                          Année clôturée
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleStartSchoolYear(year.schoolYearID)}
                        >
                          Démarrer Année Scolaire
                        </Button>
                      )}
                      {year.schoolYearStatus !== 'ENDED' && (
                        <IconButton
                          color="primary"
                          onClick={() => handleYearClick(year)}
                          sx={{ ml: 2 }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDetails(year)}
                        sx={{ ml: 'auto' }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Box>

                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>



      {/* Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>{selectedYear ? 'Modifier' : 'Ajouter'} Année Scolaire</DialogTitle>
        <DialogContent>
          {newSchoolYears.map((schoolYear, yearIndex) => (
            <Box key={yearIndex} sx={{ mb: 4 }}>
              <TextField
                label="Année Scolaire"
                fullWidth
                variant="outlined"
                value={schoolYear.schoolYear}
                onChange={(e) => handleInputChange(e, yearIndex, 'schoolYear')}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Date de début"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={schoolYear.startingDate}
                    onChange={(e) => handleInputChange(e, yearIndex, 'startingDate')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date de fin"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={schoolYear.endingDate}
                    onChange={(e) => handleInputChange(e, yearIndex, 'endingDate')}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                {schoolYear.semesters.map((semester, semesterIndex) => (
                  <Card key={semesterIndex} sx={{ p: 2, mb: 3, boxShadow: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Semestre {semesterIndex + 1}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Date de début"
                          type="date"
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          value={semester.startingDate}
                          onChange={(e) => handleSemesterChange(e, yearIndex, semesterIndex, 'startingDate')}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Date de fin"
                          type="date"
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          value={semester.endingDate}
                          onChange={(e) => handleSemesterChange(e, yearIndex, semesterIndex, 'endingDate')}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                      {semester.periods.map((period, periodIndex) => (
                        <Card key={periodIndex} sx={{ p: 2, mb: 2, boxShadow: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Période {periodIndex + 1}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                label="Date de début"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={period.startingDate}
                                onChange={(e) => handlePeriodChange(e, yearIndex, semesterIndex, periodIndex, 'startingDate')}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                label="Date de fin"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={period.endingDate}
                                onChange={(e) => handlePeriodChange(e, yearIndex, semesterIndex, periodIndex, 'endingDate')}
                              />
                            </Grid>
                          </Grid>
                        </Card>
                      ))}
                      <Button
                        variant="contained"
                        onClick={() => handleAddPeriod(yearIndex, semesterIndex)}
                        sx={{ mt: 2 }}
                      >
                        Ajouter Période
                      </Button>
                    </Box>
                  </Card>
                ))}
                <Button
                  variant="contained"
                  onClick={() => handleAddSemester(yearIndex)}
                  sx={{ mt: 2 }}
                >
                  Ajouter Semestre
                </Button>
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={formLoading}>
            {formLoading ? <CircularProgress size={24} /> : 'Enregistrer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Year Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>

        <YearDetails year={selectedYear} format={formatDate} />
        <DialogActions>
          <Button onClick={handleCloseDetails}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
