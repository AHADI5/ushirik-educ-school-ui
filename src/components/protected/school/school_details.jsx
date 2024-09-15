import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { School, LocationOn, Phone, Email, Person, Assignment, Schedule, AttachMoney, Whatshot, History } from '@mui/icons-material';

export default function SchoolInformation() {
  // School Information State
  const [schoolInfo, setSchoolInfo] = useState({
    name: "École Primaire Lumière",
    address: "123 Rue de l'Éducation, Goma",
    phone: "+243 991 234 567",
    email: "contact@ecolelumiere.com",
    director: "Mme Marie Dupont",
    mission: "Offrir une éducation de qualité et promouvoir les valeurs humaines.",
    description: "L'École Primaire Lumière est une institution éducative qui se consacre à la formation des enfants en leur offrant un cadre propice à l'apprentissage et au développement personnel.",
    schedule: "Lundi - Vendredi: 8h00 - 16h00",
    hoursOfActivity: "8h00 - 12h00 et 13h00 - 16h00",
    fees: "500 $ par an",
    values: "Respect, Intégrité, Excellence",
    history: "Fondée en 2000, l'École Primaire Lumière a toujours été dédiée à l'éducation de qualité. Nous avons formé des générations d'élèves qui se sont distingués dans divers domaines."
  });

  // Edit Mode State
  const [editMode, setEditMode] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Toggle Edit Mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save Changes
  const saveChanges = () => {
    setEditMode(false);
    // Add logic to save the data (e.g., API call)
  };

  return (
    <Box sx={{ mt: 4, mb: 4, mx: 'auto', maxWidth: '800px' }}>
      <Typography variant="h4" gutterBottom color="textPrimary" align="center" >
        Informations sur l'École
      </Typography>

      {/* General Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="textSecondary">
            Informations Générales
          </Typography>
          <Grid container spacing={2} sx = {{mt : 2}}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <School color="action" sx={{ mr: 1 }} />
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Nom de l'École"
                    name="name"
                    value={schoolInfo.name}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography variant="body1"><strong>Nom :</strong> {schoolInfo.name}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <LocationOn color="action" sx={{ mr: 1 }} />
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Adresse"
                    name="address"
                    value={schoolInfo.address}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography variant="body1"><strong>Adresse :</strong> {schoolInfo.address}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Phone color="action" sx={{ mr: 1 }} />
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Téléphone"
                    name="phone"
                    value={schoolInfo.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography variant="body1"><strong>Téléphone :</strong> {schoolInfo.phone}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Email color="action" sx={{ mr: 1 }} />
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={schoolInfo.email}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography variant="body1"><strong>Email :</strong> {schoolInfo.email}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Other Sections */}
      {[
        { icon: <Person color="action" sx={{ mr: 1 }} />, label: 'Directeur/Directrice', name: 'director', value: schoolInfo.director },
        { icon: <Assignment color="action" sx={{ mr: 1 }} />, label: 'Mission de l\'École', name: 'mission', value: schoolInfo.mission, multiline: true, rows: 3 },
        { icon: <School color="action" sx={{ mr: 1 }} />, label: 'Description de l\'École', name: 'description', value: schoolInfo.description, multiline: true, rows: 4 },
        { icon: <Schedule color="action" sx={{ mr: 1 }} />, label: 'Horaire', name: 'schedule', value: schoolInfo.schedule },
        { icon: <Schedule color="action" sx={{ mr: 1 }} />, label: 'Heures d\'Activité', name: 'hoursOfActivity', value: schoolInfo.hoursOfActivity },
        { icon: <AttachMoney color="action" sx={{ mr: 1 }} />, label: 'Frais Scolaires', name: 'fees', value: schoolInfo.fees },
        { icon: <Whatshot color="action" sx={{ mr: 1 }} />, label: 'Valeurs', name: 'values', value: schoolInfo.values },
        { icon: <History color="action" sx={{ mr: 1 }} />, label: 'Historique', name: 'history', value: schoolInfo.history, multiline: true, rows: 4 }
      ].map((section, index) => (
        <Card key={index} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="textSecondary">
              {section.label}
            </Typography>
            <Box display="flex" alignItems="center">
              {section.icon}
              {editMode ? (
                <TextField
                  fullWidth
                  label={section.label}
                  name={section.name}
                  value={section.value}
                  onChange={handleChange}
                  multiline={section.multiline || false}
                  rows={section.rows || 1}
                />
              ) : (
                <Typography variant="body1">{section.value}</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Edit and Save Buttons */}
      <Box display="flex" justifyContent="center" mt={3}>
        {editMode ? (
          <>
            <Button variant="contained" color="primary" onClick={saveChanges}>Sauvegarder</Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={toggleEditMode}>Annuler</Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={toggleEditMode}>Modifier</Button>
        )}
      </Box>
    </Box>
  );
}
