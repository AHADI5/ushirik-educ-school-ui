import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, TextField, InputAdornment, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

// Sample Data
const students = [
    { id: '12289', nom: 'Daisy', postnom: 'Scott', genre: 'F', classroom: '4th Grade', level: 'Elementary', address: '123 Main St, Goma', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '12288', nom: 'Isabel', postnom: 'Harris', genre: 'F', classroom: '5th Grade', level: 'Elementary', address: '45 Elm St, Goma', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '12287', nom: 'Dan', postnom: 'Thomas', genre: 'M', classroom: '1st Grade', level: 'Elementary', address: '78 Oak St, Goma', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '12286', nom: 'Debra', postnom: 'Nelson', genre: 'F', classroom: '6th Grade', level: 'Elementary', address: '93 Pine St, Goma', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '12285', nom: 'Vera', postnom: 'Cooper', genre: 'F', classroom: '2nd Grade', level: 'Elementary', address: '456 Maple St, Goma', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
];

const levels = ['Elementary', 'Middle School', 'High School'];
const classrooms = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade'];

const StudentDatabase = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState('');

    // Handle search filter
    const filteredStudents = students.filter((student) => {
        return (
            (student.nom.toLowerCase().includes(searchTerm.toLowerCase()) || student.postnom.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedLevel || student.level === selectedLevel) &&
            (!selectedClassroom || student.classroom === selectedClassroom)
        );
    });

    return (
        <Box sx={{ width: '86%', padding: 4 , marginTop : '5rem' , marginLeft : '12rem'}}>
            {/* Filters and Search */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                {/* Search bar */}
                <TextField
                    variant="outlined"
                    placeholder="Rechercher un étudiant"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: '300px' }}
                />

                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" variant="outlined">
                        <InputLabel>Niveau</InputLabel>
                        <Select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            label="Niveau"
                            startAdornment={<FilterListIcon />}
                        >
                            <MenuItem value=""><em>All Levels</em></MenuItem>
                            {levels.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" variant="outlined">
                        <InputLabel>Classe</InputLabel>
                        <Select
                            value={selectedClassroom}
                            onChange={(e) => setSelectedClassroom(e.target.value)}
                            label="Classe"
                            startAdornment={<FilterListIcon />}
                        >
                            <MenuItem value=""><em>All Classes</em></MenuItem>
                            {classrooms.map((classroom) => (
                                <MenuItem key={classroom} value={classroom}>
                                    {classroom}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Add student and smart count */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Smart Count Button */}
                    <Button variant="outlined" color="primary" sx={{ textTransform: 'none', borderRadius: '8px' }}>
                        Total Étudiants: {filteredStudents.length}
                    </Button>

                    {/* Add Student Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        sx={{ textTransform: 'none', borderRadius: '8px' }}
                    >
                        Ajouter un étudiant
                    </Button>
                </Box>
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{ 
                    borderRadius: '12px', 
                    boxShadow: 3, 
                    overflow: 'hidden', 
                    maxHeight: '500px' // Table is scrollable
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#F5F5FA' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Photo</strong></TableCell>
                            <TableCell><strong>Nom</strong></TableCell>
                            <TableCell><strong>Postnom</strong></TableCell>
                            <TableCell><strong>Genre</strong></TableCell>
                            <TableCell><strong>Niveau</strong></TableCell>
                            <TableCell><strong>Classe</strong></TableCell>
                            <TableCell><strong>Adresse</strong></TableCell>
                            <TableCell align="center"><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <TableRow key={student.id} hover>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>
                                        <Avatar src={student.avatar} alt={`${student.nom} ${student.postnom}`} />
                                    </TableCell>
                                    <TableCell>{student.nom}</TableCell>
                                    <TableCell>{student.postnom}</TableCell>
                                    <TableCell>{student.genre === 'F' ? 'Féminin' : 'Masculin'}</TableCell>
                                    <TableCell>{student.level}</TableCell>
                                    <TableCell>{student.classroom}</TableCell>
                                    <TableCell>{student.address}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    Aucun étudiant trouvé
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentDatabase;
