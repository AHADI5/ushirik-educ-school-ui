import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Avatar,
    TextField,
    MenuItem,
    Box,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ClassroomService from '../../../../services/class_room_service';

const ClassroomList = () => {
    const { schoolID } = useParams();
    const [classrooms, setClassrooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const data = await ClassroomService.getClassrooms(schoolID);
                setClassrooms(data);
            } catch (error) {
                console.error('Failed to fetch classrooms:', error);
            }
        };

        fetchClassrooms();
    }, [schoolID]);

    const filteredClassrooms = classrooms.filter((classroom) => {
        const className = `${classroom.level} ${classroom.letter}`;
        const matchesSearch = className.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = selectedLevel ? classroom.level === parseInt(selectedLevel) : true;
        const matchesOption = selectedOption ? classroom.optionName === selectedOption : true;
        return matchesSearch && matchesLevel && matchesOption;
    });

    const avatarColor = '#1976d2'; // Single blue color for all avatars

    return (
        <Container 
            maxWidth="lg" 
            sx={{marginLeft: '10rem', marginTop: '5rem', display: 'flex', flexDirection: 'column', paddingX: { xs: 2, sm: 3, md: 4 }, height: '100vh' }}
        >
            {/* Static Header */}
            <Box sx={{ backgroundColor: '#fff', padding: { xs: 1, md: 2 }, zIndex: 1000 }}>
                <Typography 
                    variant="h5" 
                    sx={{ marginBottom: '1rem', color: avatarColor, fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                    Gestion des salles des classes
                </Typography>

                {/* Search and Filter Bars */}
                <Box 
                    display="flex" 
                    flexDirection={{ xs: 'column', sm: 'row' }} 
                    justifyContent="space-between" 
                    alignItems={{ xs: 'stretch', sm: 'flex-start' }}
                    sx={{ marginBottom: '1rem', gap: 2 }}
                >
                    <TextField
                        label="Search by Class Name"
                        variant="outlined"
                        sx={{ marginRight: { sm: '1rem' }, flex: 1 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TextField
                        select
                        label="Filter by Level"
                        variant="outlined"
                        sx={{ width: { xs: '100%', sm: '150px' } }}
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label="Filter by Option"
                        variant="outlined"
                        sx={{ width: { xs: '100%', sm: '150px' } }}
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="Enseignement de base">Enseignement de base</MenuItem>
                    </TextField>
                </Box>
            </Box>

            {/* Scrollable Content for Classrooms */}
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 1 }}>
                <Grid container spacing={2}>
                    {filteredClassrooms.map((classroom) => {
                        const className = `${classroom.level} ${classroom.letter}`;
                        return (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                md={4} 
                                lg={3} 
                                key={classroom.classRoomID}
                            >
                                <Link 
                                    to={`/schoolDirection/${schoolID}/classrooms/${classroom.classRoomID}`} 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            borderRadius: 2,
                                            backgroundColor: '#fff',
                                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                                            width: '100%',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Avatar 
                                            sx={{ 
                                                backgroundColor: avatarColor, 
                                                width: 40, 
                                                height: 40, 
                                                marginBottom: 1, 
                                                fontSize: 12 
                                            }}
                                        >
                                            {className}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                            {classroom.teacherName || 'Unknown Teacher'}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}
                                        >
                                            Option: {classroom.optionName}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}
                                        >
                                            Students: {classroom.studentNumber} | Courses: {classroom.courseNumber} | Teacher: 1
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

export default ClassroomList;
