import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box } from '@mui/material';

const TabMenu = () => {
    const tabs = [
        { label: 'Overview', path: '' },
        { label: 'Élèves', path: 'eleves' },
        { label: 'Cours', path: 'cours' },
        { label: 'Horaires', path: 'horaires' },
    ];

    return (
        <Box sx={{ marginLeft: '12rem', marginTop: '5rem' , color :'black' }}>
            <AppBar position="static" sx = {{backgroundColor : 'white'}} >
                <Tabs>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            component={NavLink}
                            to={tab.path === '' ? '.' : tab.path}
                            end={tab.path === ''}
                            sx={{ 
                                textTransform: 'none',
                                '&.active': {
                                    backgroundColor: '#1976d2', // Change this to your desired active color
                                    color: 'white', // Ensures text color contrast
                                }
                            }}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <Box sx={{ padding: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default TabMenu;
