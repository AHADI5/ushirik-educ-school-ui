import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Container, CardActionArea } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import ClassIcon from '@mui/icons-material/Class';
import { useParams } from 'react-router-dom';
import useUserData from '../../../services/users_service';

import { deepOrange, teal, purple, blue} from '@mui/material/colors';

export default function AdminDashboard() {
  const { schoolID } = useParams();
  const  {allUsers} = useUserData(schoolID)
 
  const featureCards = [
    {
      title: 'Utilisateurs',
      description: 'Ajouter, modifier et gérer tous les utilisateurs.',
      icon: <PeopleIcon fontSize="large" />,
      iconColor: deepOrange[500],
      link: `/schoolAdmin/${schoolID}/users`,
      stat: allUsers.length // Example stat value
    },
    {
      title: 'Années Scolaires',
      description: 'Gérer les semestres et périodes.',
      icon: <EventIcon fontSize="large" />,
      iconColor: teal[500],
      link: `/schoolAdmin/${schoolID}/schoolyears`,
      stat: 4, // Example stat value
    },
    {
      title: 'Informations Générales',
      description: 'Gérer les frais scolaires et horaires.',
      icon: <SchoolIcon fontSize="large" />,
      iconColor: purple[500],
      link: `/schoolAdmin/${schoolID}/informations`,
      stat: 8, // Example stat value
    },
    {
      title: 'Salles de Classe',
      description: 'Organiser les salles de classe et options.',
      icon: <ClassIcon fontSize="large" />,
      iconColor: blue[500],
      link: `/schoolAdmin/${schoolID}/classrooms`,
      stat: 12, // Example stat value
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Section */}
      <Box mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Tableau de Bord Administrateur
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Gérer utilisateurs, années scolaires, informations générales et salles de classe.
        </Typography>
      </Box>

      {/* Feature Cards Section */}
      <Grid container spacing={4}>
        {featureCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ position: 'relative', overflow: 'hidden' }}>
              <CardActionArea href={card.link}>
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Box mb={2}>
                    <Avatar sx={{ bgcolor: card.iconColor, width: 56, height: 56, margin: '0 auto' }}>
                      {card.icon}
                    </Avatar>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {card.description}
                  </Typography>
                  {/* Stat Number */}
                  <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        color: card.iconColor,
                        backgroundColor: `${card.iconColor}1A`, // Add transparency to the background
                        padding: '8px 16px',
                        borderRadius: '8px',
                      }}
                    >
                      {card.stat}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
