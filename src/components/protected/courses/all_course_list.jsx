import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CourseService from "../../../services/course_service";
import { useParams } from "react-router-dom";

export default function AllCoursesList() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const { schoolID } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await CourseService.getCourses(schoolID);
        console.log(courseData)
        setCourses(courseData);
        const categoryData = await CourseService.getCourseCategory(schoolID);
        setCategories(categoryData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [schoolID]);

  const handleAddCategory = async () => {
    try {
      const newCategory = {
        name: newCategoryName,
        Description: newCategoryDescription,
        schoolID: parseInt(schoolID),
      };
      await CourseService.AddCourseCategory(newCategory);
      const updatedCategories = await CourseService.getCourseCategories(schoolID);
      setCategories(updatedCategories);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setOpenAddCategory(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const newCourse = {
        name: newCourseName,
        Description: newCourseDescription,
        category: selectedCategory,
        schoolID: parseInt(schoolID),
      };
      await CourseService.addCourse(newCourse);
      const updatedCourses = await CourseService.getCourses(schoolID);
      setCourses(updatedCourses);
      setNewCourseName("");
      setNewCourseDescription("");
      setSelectedCategory("");
      setOpenAddCourse(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours:", error);
    }
  };

  return (
    <div className="ml-48 mt-16">
      <Paper sx={{ padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Tous les cours</Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={() => setOpenAddCategory(true)}
            >
              Ajouter une catégorie
            </Button>
            <Button variant="contained" color="primary" onClick={() => setOpenAddCourse(true)}>
              Ajouter un cours
            </Button>
          </Box>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="400px">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID du cours</TableCell>
                  <TableCell>Nom du cours</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.courseID}>
                    <TableCell>{course.courseID}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.Description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Dialog for adding a new category */}
      <Dialog open={openAddCategory} onClose={() => setOpenAddCategory(false)}>
        <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la catégorie"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description de la catégorie"
            type="text"
            fullWidth
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCategory(false)}>Annuler</Button>
          <Button onClick={handleAddCategory} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding a new course */}
      <Dialog open={openAddCourse} onClose={() => setOpenAddCourse(false)}>
        <DialogTitle>Ajouter un nouveau cours</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du cours"
            type="text"
            fullWidth
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description du cours"
            type="text"
            fullWidth
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCourse(false)}>Annuler</Button>
          <Button onClick={handleAddCourse} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
