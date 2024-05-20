import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Paper
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import CourseService from '../../../services/course_service';
import { useParams } from 'react-router-dom';

const fetchCategories = async (schoolID) => {
  try {
    const response = await CourseService.getCourseCategory(schoolID);
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const CourseForm = ({ onSave, onCancel }) => {
  const { schoolID, classID } = useParams();
  const [categories, setCategories] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    credits: '',
    classRoomID: `${classID}`,
    tools: [{ name: '', quantity: '' }],
    requirements: [{ name: '', description: '' }],
    courseCategory: ''  // Change from array to single number
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories(schoolID);
      setCategories(fetchedCategories);
    };
    fetchData();
  }, [schoolID]);

  const handleChange = (field, value) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const handleToolChange = (index, field, value) => {
    const updatedTools = courseData.tools.map((tool, idx) => (
      idx === index ? { ...tool, [field]: value } : tool
    ));
    setCourseData({ ...courseData, tools: updatedTools });
  };

  const handleRequirementChange = (index, field, value) => {
    const updatedRequirements = courseData.requirements.map((req, idx) => (
      idx === index ? { ...req, [field]: value } : req
    ));
    setCourseData({ ...courseData, requirements: updatedRequirements });
  };

  const handleAddTool = () => {
    setCourseData({ ...courseData, tools: [...courseData.tools, { name: '', quantity: '' }] });
  };

  const handleRemoveTool = (index) => {
    setCourseData({ ...courseData, tools: courseData.tools.filter((_, idx) => idx !== index) });
  };

  const handleAddRequirement = () => {
    setCourseData({ ...courseData, requirements: [...courseData.requirements, { name: '', description: '' }] });
  };

  const handleRemoveRequirement = (index) => {
    setCourseData({ ...courseData, requirements: courseData.requirements.filter((_, idx) => idx !== index) });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    onSave(courseData);
  };

  const steps = ['Détails', 'Outils', 'Modalités'];

  return (
    <Paper sx={{ padding: 2 }}>
      <div className='flex gap-52'>
        <IconButton onClick={onCancel}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h7">Ajouter un nouveau cours</Typography>
      </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === 0 && (
          <Box>
            <Box display="flex" gap={2}>
              <TextField
                size='small'
                fullWidth
                margin="normal"
                label="Nom du cours"
                value={courseData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Categorie</InputLabel>
                <Select
                  size='small'
                  value={courseData.courseCategory}
                  onChange={(e) => handleChange('courseCategory', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.courseCategory} value={category.courseCategory}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              size='small'
              fullWidth
              margin="normal"
              label="Crédits"
              value={courseData.credits}
              onChange={(e) => handleChange('credits', e.target.value)}
            />
            <TextField
              size='small'
              fullWidth
              margin="normal"
              label="Description"
              value={courseData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6">Outils</Typography>
            <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
              {courseData.tools.map((tool, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2} gap={2}>
                  <TextField
                    size='small'
                    fullWidth
                    margin="normal"
                    label="Nom de l'outil"
                    value={tool.name}
                    onChange={(e) => handleToolChange(index, 'name', e.target.value)}
                  />
                  <TextField
                    size='small'
                    fullWidth
                    margin="normal"
                    label="Quantité"
                    value={tool.quantity}
                    onChange={(e) => handleToolChange(index, 'quantity', e.target.value)}
                  />
                  <IconButton onClick={() => handleRemoveTool(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddTool}>
              Ajouter Outil
            </Button>
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6">Modalités</Typography>
            <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
              {courseData.requirements.map((requirement, index) => (
                <Box key={index} display="flex" gap={2} mb={2}>
                  <TextField
                    size='small'
                    fullWidth
                    margin="normal"
                    label="Nom de la modalité"
                    value={requirement.name}
                    onChange={(e) => handleRequirementChange(index, 'name', e.target.value)}
                  />
                  <TextField
                    size='small'
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={requirement.description}
                    onChange={(e) => handleRequirementChange(index, 'description', e.target.value)}
                  />
                  <IconButton onClick={() => handleRemoveRequirement(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddRequirement}>
              Ajouter Modalité
            </Button>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Retour
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Enregistrer le cours
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Suivant
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default CourseForm;
