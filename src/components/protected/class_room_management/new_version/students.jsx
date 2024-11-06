import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';

// Sample Data
const students = [
    { id: '12289', nom: 'Daisy', postnom: 'Scott', genre: 'F', parentEmail: 'daisy22@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '12288', nom: 'Isabel', postnom: 'Harris', genre: 'F', parentEmail: 'isabel887@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '12287', nom: 'Dan', postnom: 'Thomas', genre: 'M', parentEmail: 'dan87675@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '12286', nom: 'Debra', postnom: 'Nelson', genre: 'F', parentEmail: 'debra1212@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '12285', nom: 'Vera', postnom: 'Cooper', genre: 'F', parentEmail: 'vera8888@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: '12284', nom: 'Brian', postnom: 'Miller', genre: 'M', parentEmail: 'brian5564@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { id: '12283', nom: 'Lauren', postnom: 'Martin', genre: 'F', parentEmail: 'lauren7712@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
];

const StudentList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search filter
    const filteredStudents = students.filter(
        (student) =>
            student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.postnom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.parentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ width: '100%', padding: 1 }}>
            {/* Action buttons: Add student and send message */}
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

                {/* Message and Add buttons */}
                <Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ textTransform: 'none', marginRight: 2, borderRadius: '8px' }}
                        startIcon={<EmailIcon />}
                    >
                        Envoyer un message
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none', borderRadius: '8px' }}
                    >
                        + Ajouter un étudiant
                    </Button>
                </Box>
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{ 
                    borderRadius: '12px', 
                    boxShadow: 3, 
                    overflow: 'scroll', 
                    maxHeight: '400px'  // Set a max height for the table to enable scrolling
                }}
            >
                <Table stickyHeader> {/* Sticky header keeps the headers fixed while scrolling */}
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#F5F5FA' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Photo</strong></TableCell>
                            <TableCell><strong>Nom</strong></TableCell>
                            <TableCell><strong>Postnom</strong></TableCell>
                            <TableCell><strong>Genre</strong></TableCell>
                            <TableCell><strong>Email Parent</strong></TableCell>
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
                                    <TableCell>{student.parentEmail}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="message" color="info">
                                            <MessageIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
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

export default StudentList;
