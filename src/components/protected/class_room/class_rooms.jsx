import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, TextField, Button, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle,
  Tabs, Tab, Fab, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { Add, Search, Edit, Delete } from '@mui/icons-material';
import ClassroomService from '../../../services/class_room_service'; // Ajuste l'import selon votre structure de fichier

export default function ClassroomsAndOptionsManagement() {
  const { schoolID } = useParams();
  const [value, setValue] = useState(0);
  const [classrooms, setClassrooms] = useState([]);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState({ level: '', option: '', search: '' });
  const [newClassrooms, setNewClassrooms] = useState([{ number: 1, level: '', classRoomOption: '' }]);
  const [newOption, setNewOption] = useState({ name: '', Description: '' ,schoolID : schoolID });
  const [openClassroomDialog, setOpenClassroomDialog] = useState(false);
  const [openOptionDialog, setOpenOptionDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedClassrooms = await ClassroomService.getClassrooms(schoolID);
        console.log(fetchedClassrooms)
        setClassrooms(fetchedClassrooms)
        const fetchedOptions = await ClassroomService.getClassroomSection(schoolID);
        setOptions(fetchedOptions);
        console.log(fetchedOptions)
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolID]);

  const handleTabChange = (event, newValue) => setValue(newValue);

  const handleClassroomGroupChange = (e, index) => {
    const { name, value } = e.target;
    const updatedGroups = [...newClassrooms];
    updatedGroups[index] = { ...updatedGroups[index], [name]: value };
    setNewClassrooms(updatedGroups);
  };

  const handleClassroomGroupAdd = () => {
    setNewClassrooms([...newClassrooms, { number: 1, level: '', ClassRoomOptionID: '' }]);
  };

  const handleClassroomGroupRemove = (index) => {
    setNewClassrooms(newClassrooms.filter((_, i) => i !== index));
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({ ...prev, [name]: value }));
  };

  const addClassrooms = async () => {
    setLoading(true);
    try {
      let allClassrooms = [];
      newClassrooms.forEach(group => {
        const groupClassrooms = Array.from({ length: group.number }, (_, i) => ({
          letter: String.fromCharCode(65 + i),
          level: group.level,
          ClassRoomOptionID : group.classRoomOption
        }));
        allClassrooms = [...allClassrooms, ...groupClassrooms];
      });
      console.log(allClassrooms)

      await ClassroomService.createClassroom(schoolID, allClassrooms);

      setClassrooms((prev) => [...prev, ...allClassrooms]);
      setNewClassrooms([{ number: 1, level: '', classRoomOption: '' }]);
      setOpenClassroomDialog(false);
      setSnackbarMessage('Classes ajoutées avec succès');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de l\'ajout des classes:', error);
      setSnackbarMessage('Échec de l\'ajout des classes');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const addOption = async () => {
    setLoading(true);
    try {
      const newOptionData = await ClassroomService.createClassroomOption(schoolID, newOption);
      console.log(newOptionData)
      setOptions([...options, newOptionData]);
      setNewOption({ name: '', description: '' });
      setOpenOptionDialog(false);
      setSnackbarMessage('Option ajoutée avec succès');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'option:', error);
      setSnackbarMessage('Échec de l\'ajout de l\'option');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredClassrooms = classrooms.filter((classroom) => (
    (filters.level === '' || classroom.level === parseInt(filters.level)) &&
    (filters.option === '' || classroom.option === filters.option) &&
    (filters.search === '' || classroom.letter.toLowerCase().includes(filters.search.toLowerCase()))
  ));

  const handleEditClassroom = (id) => {
    console.log(`Éditer la classe avec l'id : ${id}`);
  };

  const handleDeleteClassroom = async (id) => {
    try {
      await ClassroomService.deleteClassroom(id);
      setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la classe:', error);
    }
  };

  const handleEditOption = (id) => {
    console.log(`Éditer l'option avec l'id : ${id}`);
  };

  const handleDeleteOption = async (id) => {
    try {
      await ClassroomService.deleteClassroomOption(id);
      setOptions(options.filter((option) => option.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'option:', error);
    }
  };

  return (
    <Box sx={{ mt: 8, ml: 25, mr: 10 }}>
      <Tabs value={value} onChange={handleTabChange} aria-label="Onglets Classes et Options">
        <Tab label="Classes" />
        <Tab label="Options" />
      </Tabs>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {value === 0 && (
        <Box sx={{ p: 2 }}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Recherche"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton edge="end">
                          <Search />
                        </IconButton>
                      ),
                    }}
                    sx={{ height: '40px', fontSize: '0.8rem', '& .MuiInputBase-root': { height: '40px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Niveau</InputLabel>
                    <Select
                      value={filters.level}
                      name="level"
                      onChange={handleFilterChange}
                      sx={{ height: '40px', fontSize: '0.8rem' }}
                    >
                      <MenuItem value="">Tous</MenuItem>
                      <MenuItem value="1">Niveau 1</MenuItem>
                      <MenuItem value="2">Niveau 2</MenuItem>
                      {/* Ajoutez plus de niveaux si disponibles */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Option</InputLabel>
                    <Select
                      value={filters.option}
                      name="option"
                      onChange={handleFilterChange}
                      sx={{ height: '40px', fontSize: '0.8rem' }}
                    >
                      <MenuItem value="">Toutes</MenuItem>
                      {options.map((option) => (
                        <MenuItem key={option.classRoomOption} value={option.classRoomOption}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box textAlign="right" sx={{ mt: 2 }}>
                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={() => setOpenClassroomDialog(true)}
                >
                  <Add />
                </Fab>
              </Box>

              <TableContainer component={Paper} sx={{ maxHeight: 500, overflowY: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Lettre</TableCell>
                      <TableCell>Niveau</TableCell>
                      <TableCell>Option</TableCell>
                      <TableCell>Nombre cours</TableCell>
                      <TableCell>Elèves inscrits</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredClassrooms.map((classroom) => (
                      <TableRow key={classroom.ClassRoomOptionID}>
                        <TableCell>{classroom.letter}</TableCell>
                        <TableCell>{classroom.level}</TableCell>
                        <TableCell>{classroom.optionName}</TableCell>
                        <TableCell>{classroom.courseNumber}</TableCell>
                        <TableCell>{classroom.studentNumber}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditClassroom(classroom.id)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClassroom(classroom.id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}

      {value === 1 && (
        <Box sx={{ p: 2 }}>
          <Card>
            <CardContent>
              <Box textAlign="right" sx={{ mb: 2 }}>
                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={() => setOpenOptionDialog(true)}
                >
                  <Add />
                </Fab>
              </Box>

              <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {options.map((option) => (
                      <TableRow key={option.classRoomOptionID}>
                        <TableCell>{option.name}</TableCell>
                        <TableCell>{option.description}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEditOption(option.classRoomOptionID)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteOption(option.classRoomOptionID)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}

      <Dialog open={openClassroomDialog} onClose={() => setOpenClassroomDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter des Classes</DialogTitle>
        <DialogContent>
          {newClassrooms.map((group, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Nombre de classes"
                    type="number"
                    name="number"
                    value={group.number}
                    onChange={(e) => handleClassroomGroupChange(e, index)}
                    fullWidth
                    margin="normal"
                    InputProps={{ inputProps: { min: 1 } }} // Prevent negative numbers
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Niveau</InputLabel>
                    <Select
                      name="level"
                      value={group.level}
                      onChange={(e) => handleClassroomGroupChange(e, index)}
                      label="Niveau"
                    >
                      <MenuItem value={1}>Première</MenuItem>
                      <MenuItem value={2}>Deuxième</MenuItem>
                      <MenuItem value={3}>Troisième</MenuItem>
                      <MenuItem value={4}>Quatrième</MenuItem>
                      <MenuItem value={5}>Cinquième</MenuItem>
                      <MenuItem value={6}>Sixième</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Option</InputLabel>
                    <Select
                      name="classRoomOption"
                      value={group.classRoomOption}
                      onChange={(e) => handleClassroomGroupChange(e, index)}
                      label="Option"
                    >
                      {options.map((option) => (
                        <MenuItem key={option.classRoomOptionID} value={option.classRoomOptionID}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                onClick={() => handleClassroomGroupRemove(index)}
                color="error"
                sx={{ mt: 1 }}
              >
                Supprimer ce groupe
              </Button>
            </Box>
          ))}
          <Button
            onClick={handleClassroomGroupAdd}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Ajouter Plus de Classes
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClassroomDialog(false)}>Annuler</Button>
          <Button
            onClick={addClassrooms}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Ajouter'}
          </Button>
        </DialogActions>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('Échec') ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Dialog>


      <Dialog open={openOptionDialog} onClose={() => setOpenOptionDialog(false)}>
        <DialogTitle>Ajouter une Option</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de l'option"
            name="name"
            value={newOption.name}
            onChange={handleOptionChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="Description"
            value={newOption.description}
            onChange={handleOptionChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOptionDialog(false)}>Annuler</Button>
          <Button onClick={addOption} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('succès') ? 'success' : 'error'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
