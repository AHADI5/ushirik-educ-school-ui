import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  MenuItem, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress 
} from '@mui/material';

import instance from "../../../services/axios";
import { useParams } from 'react-router-dom';

export default function SchoolRules() {
  const [rules, setRules] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const param = useParams();
  const [newRules, setNewRules] = useState([
    {
      title: '',
      schoolID: `${param['schoolID']}`,
      content: '',
      violationType: [
        {
          title: '',
          description: '',
          occurrenceNumber: '',
          sanctionPredefinedType: '',
          sanctionType: ''
        }
      ]
    }
  ]);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/api/v1/discipline/${param['schoolID']}/getRulesBySchoolID`);
      setRules(response.data);
    } catch (error) {
      console.error('Failed to fetch rules', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRuleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRules = [...newRules];
    updatedRules[index][name] = value;
    setNewRules(updatedRules);
  };

  const handleViolationChange = (ruleIndex, violationIndex, e) => {
    const { name, value } = e.target;
    const updatedRules = [...newRules];
    updatedRules[ruleIndex].violationType[violationIndex][name] = value;
    setNewRules(updatedRules);
  };

  const handleAddRule = () => {
    setNewRules([...newRules, {
      title: '',
      schoolID: `${param['schoolID']}`,
      content: '',
      violationType: [
        {
          title: '',
          description: '',
          occurrenceNumber: '',
          sanctionPredefinedType: '',
          sanctionType: ''
        }
      ]
    }]);
  };

  const handleAddViolation = (ruleIndex) => {
    const updatedRules = [...newRules];
    updatedRules[ruleIndex].violationType.push({
      title: '',
      description: '',
      occurrenceNumber: '',
      sanctionPredefinedType: '',
      sanctionType: ''
    });
    setNewRules(updatedRules);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await instance.post('/api/v1/discipline/newRules', newRules);
      fetchRules();
      handleClose();
    } catch (error) {
      console.error('Failed to add rules', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="ml-48 mt-16">
      <Container>
        <Typography variant="h4" gutterBottom className="ml-48 mt-16">
          School Rules
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Rules
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {rules.map((rule) => (
              <ListItem key={rule.id}>
                <ListItemText primary={rule.title} secondary={rule.content} />
              </ListItem>
            ))}
          </List>
        )}
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogTitle>Add New Rules</DialogTitle>
          <DialogContent>
            {newRules.map((rule, ruleIndex) => (
              <div key={ruleIndex}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  name="title"
                  value={rule.title}
                  onChange={(e) => handleRuleChange(ruleIndex, e)}
                />
                <TextField
                  margin="dense"
                  label="Content"
                  type="text"
                  fullWidth
                  name="content"
                  value={rule.content}
                  onChange={(e) => handleRuleChange(ruleIndex, e)}
                />
                {rule.violationType.map((violation, violationIndex) => (
                  <div key={violationIndex}>
                    <TextField
                      margin="dense"
                      label="Violation Title"
                      type="text"
                      fullWidth
                      name="title"
                      value={violation.title}
                      onChange={(e) => handleViolationChange(ruleIndex, violationIndex, e)}
                    />
                    <TextField
                      margin="dense"
                      label="Violation Description"
                      type="text"
                      fullWidth
                      name="description"
                      value={violation.description}
                      onChange={(e) => handleViolationChange(ruleIndex, violationIndex, e)}
                    />
                    <TextField
                      margin="dense"
                      label="Occurrence Number"
                      type="number"
                      fullWidth
                      name="occurrenceNumber"
                      value={violation.occurrenceNumber}
                      onChange={(e) => handleViolationChange(ruleIndex, violationIndex, e)}
                    />
                    <TextField
                      margin="dense"
                      label="Sanction Predefined Type"
                      select
                      fullWidth
                      name="sanctionPredefinedType"
                      value={violation.sanctionPredefinedType}
                      onChange={(e) => handleViolationChange(ruleIndex, violationIndex, e)}
                    >
                      <MenuItem value="Remark">Remark</MenuItem>
                      <MenuItem value="Temp_exclude">Temporary Exclusion</MenuItem>
                      <MenuItem value="def_exclude">Definitive Exclusion</MenuItem>
                      <MenuItem value="invite_parent">Invite Parent</MenuItem>
                      <MenuItem value="warning">Warning</MenuItem>
                    </TextField>
                    <TextField
                      margin="dense"
                      label="Sanction Type"
                      type="text"
                      fullWidth
                      name="sanctionType"
                      value={violation.sanctionType}
                      onChange={(e) => handleViolationChange(ruleIndex, violationIndex, e)}
                    />
                  </div>
                ))}
                <Button onClick={() => handleAddViolation(ruleIndex)} color="primary">
                  Add Violation
                </Button>
                <hr />
              </div>
            ))}
            <Button onClick={handleAddRule} color="primary">
              Add Rule
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
