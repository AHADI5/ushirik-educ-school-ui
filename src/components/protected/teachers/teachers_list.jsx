import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Checkbox,
  ListItemText,
  CircularProgress,
  ListSubheader,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TeacherService from "../../../services/teacher_service";
import CourseService from "../../../services/course_service";
import { useParams } from "react-router-dom";

export default function GestionEnseignants() {
  const [termRecherche, setTermRecherche] = useState("");
  const [lignes, setLignes] = useState([]);
  const [coursGroupes, setCoursGroupes] = useState({});
  const [enseignantSelectionne, setEnseignantSelectionne] = useState(null);
  const [afficherDetailsEnseignant, setAfficherDetailsEnseignant] = useState(false);
  const [valeurOnglet, setValeurOnglet] = useState(0);
  const [coursSelectionnes, setCoursSelectionnes] = useState([]);
  const [chargementEnseignants, setChargementEnseignants] = useState(true);
  const [chargementCours, setChargementCours] = useState(true);
  const [chargementAssignation, setChargementAssignation] = useState(false);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const params = useParams();
  const schoolID = params.schoolID;

  useEffect(() => {
    async function fetchEnseignants() {
      try {
        const data = await TeacherService.getTeachers(schoolID);
        setLignes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des enseignants:", error);
      } finally {
        setChargementEnseignants(false);
      }
    }

    async function fetchCours() {
      try {
        const data = await CourseService.getCourses(schoolID);

        const groupes = data.reduce((acc, classData) => {
          const { classRoom, courseFormList } = classData;
          if (!acc[classRoom]) {
            acc[classRoom] = [];
          }
          acc[classRoom] = [...acc[classRoom], ...courseFormList];
          return acc;
        }, {});
        setCoursGroupes(groupes);

      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      } finally {
        setChargementCours(false);
      }
    }

    fetchEnseignants();
    fetchCours();
  }, [schoolID]);

  const fetchTeacherCourses = async (teacherID) => {
    try {
      const data = await CourseService.getAllCoursesAssigned(teacherID);
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des cours du professeur:", error);
      return [];
    }
  };

  const handleLigneClique = async (params) => {
    setChargementCours(true);
    const selectedTeacher = params.row;
    setEnseignantSelectionne(selectedTeacher);
    setAfficherDetailsEnseignant(true);
    const teacherCourses = await fetchTeacherCourses(selectedTeacher.id);
    console.log(teacherCourses)
    setAssignedCourses(teacherCourses);
    setChargementCours(false);
  };

  const handleRetour = () => {
    setEnseignantSelectionne(null);
    setAfficherDetailsEnseignant(false);
    setValeurOnglet(0);
    setAssignedCourses([]);
  };

  const handleRecherche = (event) => {
    const value = event.target.value.toLowerCase();
    setTermRecherche(value);
    const filteredRows = lignes.filter(
      (row) =>
        (row.firstName && row.firstName.toLowerCase().includes(value)) ||
        (row.lastName && row.lastName.toLowerCase().includes(value)) ||
        (row.email && row.email.toLowerCase().includes(value)) ||
        (row.phone && row.phone.toLowerCase().includes(value))
    );
    setLignes(filteredRows);
  };

  const handleOngletChange = (event, newValue) => {
    setValeurOnglet(newValue);
  };

  const handleAssignationCours = async () => {
    setChargementAssignation(true);
    try {
      const dataToSend = {
        teacherID: enseignantSelectionne.id,
        courseIDs: coursSelectionnes,
      };
      
      console.log(await CourseService.assignCourse(dataToSend))
      const updatedCourses = await fetchTeacherCourses(enseignantSelectionne.id);
      setAssignedCourses(updatedCourses);
    } catch (error) {
      console.error("Erreur lors de l'assignation des cours:", error);
    } finally {
      setChargementAssignation(false);
    }
  };

  const handleCoursChange = (event) => {
    setCoursSelectionnes(event.target.value);
  };

  return (
    <div className="ml-48 mt-16">
      <Paper sx={{ padding: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={handleRetour} disabled={!afficherDetailsEnseignant}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Gestion des Enseignants
          </Typography>
        </Box>
        {!afficherDetailsEnseignant ? (
          chargementEnseignants ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TextField
                size="small"
                fullWidth
                margin="normal"
                label="Recherche"
                value={termRecherche}
                onChange={handleRecherche}
                sx={{ marginBottom: 2 }}
              />
              <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                <DataGrid
                  rows={lignes}
                  columns={[
                    { field: "id", headerName: "ID", width: 70 },
                    { field: "firstName", headerName: "Prénom", width: 130 },
                    { field: "lastName", headerName: "Nom de famille", width: 130 },
                    { field: "email", headerName: "Email", width: 160 },
                    { field: "phone", headerName: "Téléphone", width: 160 },
                  ]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  onRowClick={handleLigneClique}
                />
              </div>
            </>
          )
        ) : (
          <Box sx={{ marginTop: "20px" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Enseignant</InputLabel>
              <Select
                value={enseignantSelectionne.id}
                onChange={(e) => {
                  const teacher = lignes.find((row) => row.id === e.target.value);
                  setEnseignantSelectionne(teacher);
                }}
              >
                {lignes.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tabs
              value={valeurOnglet}
              onChange={handleOngletChange}
              aria-label="onglets des détails de l'enseignant"
              sx={{ marginTop: 2 }}
            >
              <Tab label="Informations personnelles" />
              <Tab label="Cours assignés" />
            </Tabs>
            {valeurOnglet === 0 && (
              <Box>
                <Typography variant="subtitle1" mt={2}>
                  Informations personnelles
                </Typography>
                <Typography variant="body2">
                  Nom: {enseignantSelectionne.firstName} {enseignantSelectionne.lastName}
                </Typography>
                <Typography variant="body2">
                  Email: {enseignantSelectionne.email}
                </Typography>
               
              </Box>
            )}
            {valeurOnglet === 1 && (
              <Box>
                <Typography variant="subtitle1" mt={2}>
                  Cours assignés
                </Typography>
                {chargementCours ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 300 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID du cours</TableCell>
                          <TableCell>Nom du cours</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {assignedCourses.map((course) => (
                          <TableRow key={course.courseID}>
                            <TableCell>{course.courseID}</TableCell>
                            <TableCell>{course.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                <Box display="flex" alignItems="center" mt={2}>
                  <FormControl fullWidth margin="normal" sx={{ flexGrow: 1 }}>
                    <InputLabel>Nouveaux cours</InputLabel>
                    <Select
                      multiple
                      value={coursSelectionnes}
                      onChange={handleCoursChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {Object.entries(coursGroupes).flatMap(([classRoom, courseList]) => [
                        <ListSubheader key={`header-${classRoom}`}>{`Classroom ${classRoom}`}</ListSubheader>,
                        ...courseList.map((course) => (
                          <MenuItem key={course.courseID} value={course.courseID}>
                            <Checkbox checked={coursSelectionnes.indexOf(course.courseID) > -1} />
                            <ListItemText primary={course.name} />
                          </MenuItem>
                        )),
                      ])}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2, mt: 2 }}
                    onClick={handleAssignationCours}
                    disabled={chargementAssignation}
                  >
                    {chargementAssignation ? <CircularProgress size={24} /> : "Assigner les cours"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </div>
  );
}
