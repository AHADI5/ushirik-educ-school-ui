import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Switch, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import useUserData from '../../../services/users_service';
import { useParams } from 'react-router-dom';
import instance from '../../../services/axios';

export default function UserManagement() {
  const { schoolID } = useParams();
  const { allUsers } = useUserData(schoolID);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [loadingUserID, setLoadingUserID] = useState(null); // State to manage loader for specific user

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  // Handle toggling the user's active status
  const handleToggleActive = async (user) => {
    setLoadingUserID(user.userID); // Show loader for the specific user

    try {
      const newStatus = !user.enabled;
      const endpoint = newStatus ? `/api/v1/auth/${user.email}/enableUser` : `/api/v1/auth/${user.email}/disableUser`;

      await instance.put(endpoint);

      // Update local state with the new status
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.userID === user.userID ? { ...u, enabled: newStatus } : u
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    } finally {
      setLoadingUserID(null); // Hide loader for the specific user
    }
  };

  // Handle clicking on a user card to open the permissions popup
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  // Handle permission change
  const handlePermissionChange = (permission) => {
    if (selectedUser) {
      setSelectedUser(prevUser => {
        const newPermissions = prevUser.permissions?.includes(permission)
          ? prevUser.permissions.filter(p => p !== permission)
          : [...(prevUser.permissions || []), permission];

        return { ...prevUser, permissions: newPermissions };
      });
    }
  };

  // Save updated permissions
  const handleSavePermissions = async () => {
    setLoading(true);

    try {
      // Update permissions in the state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.userID === selectedUser.userID ? { ...selectedUser } : user
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error saving permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter dropdown change
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Filtered users based on search term and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || (filterStatus === 'active' && user.enabled) || (filterStatus === 'inactive' && !user.enabled);

    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Utilisateurs
      </Typography>

      {/* Search and Filter Section */}
      <Box
        sx={{
          position: 'fixed',
          top: '80px',
          left: 210,
          right: 210,
          zIndex: 1000,
          bgcolor: 'background.paper',
          p: 2,
          boxShadow: 1,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher par nom ou email"
            sx={{ width: '300px' }}
          />
          <TextField
            label="Filtrer par statut"
            variant="outlined"
            size="small"
            select
            value={filterStatus}
            onChange={handleFilterChange}
            sx={{ width: '200px' }}
          >
            <MenuItem value="all">Tous les utilisateurs</MenuItem>
            <MenuItem value="active">Actif</MenuItem>
            <MenuItem value="inactive">Inactif</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* User List Section */}
      <Box
        sx={{
          mt: 12,
          height: 'calc(100vh - 160px)',
          overflowY: 'auto',
          ml: 25,
          p: 2,
        }}
      >
        {apiLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.userID}>
                  <Card onClick={() => handleUserClick(user)} sx={{ cursor: 'pointer' }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ mr: 2 }}>
                          {user.firstName[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                          <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body2">
                          <strong>Role:</strong> {user.role}
                        </Typography>
                        {user.role === 'DIRECTOR' ? <SupervisorAccountIcon /> : user.role === 'TEACHER' ? <SchoolIcon /> : <PersonIcon />}
                      </Box>

                      <Typography variant="body2">
                        Date de création : {new Date(user.createdAt).toLocaleDateString()}
                      </Typography>

                      <Box display="flex" alignItems="center" mt={2}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Statut : {user.enabled ? 'Actif' : 'Inactif'}
                        </Typography>
                        {loadingUserID === user.userID ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Switch
                            checked={user.enabled}
                            onChange={() => handleToggleActive(user)}
                            color="primary"
                            onClick={(e) => e.stopPropagation()} // Prevent click from triggering user details redirect
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                Aucun utilisateur trouvé.
              </Typography>
            )}
          </Grid>
        )}
      </Box>

      {/* Permissions Dialog */}
      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modifier les Permissions - {selectedUser.firstName} {selectedUser.lastName}</DialogTitle>
          <DialogContent>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <Box display="flex" flexDirection="column">
                {['View Grades', 'Edit Homework', 'Manage Users', 'Edit Settings', 'View Reports'].map(permission => (
                  <FormControlLabel
                    key={permission}
                    control={
                      <Checkbox
                        checked={selectedUser.permissions?.includes(permission) || false}
                        onChange={() => handlePermissionChange(permission)}
                      />
                    }
                    label={permission}
                  />
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Annuler</Button>
            <Button onClick={handleSavePermissions} color="primary">Enregistrer</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
