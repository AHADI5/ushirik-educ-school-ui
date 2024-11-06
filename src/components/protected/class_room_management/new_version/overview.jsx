import React from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample Data for Charts
const genderData = [{ name: 'Girls', value: 234 }, { name: 'Boys', value: 193 }];
const attendanceData = [
    { day: 'Mon', Present: 90, Absent: 10 },
    { day: 'Tue', Present: 80, Absent: 20 },
    { day: 'Wed', Present: 85, Absent: 15 },
    { day: 'Thu', Present: 70, Absent: 30 },
    { day: 'Fri', Present: 95, Absent: 5 },
];
const behaviorData = [
    { name: 'Good Behavior', value: 300 },
    { name: 'Bad Behavior', value: 100 },
];
const events = [
    { title: 'New Student Inauguration Ceremony', date: '19 July' },
    { title: 'Student Body Handover', date: '19 July' },
    { title: 'Closing of School Clubs', date: '27 July' },
];

const ClassroomOverview = () => {
    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#F9FAFC' }}>
            {/* Dashboard Body */}
            <Box sx={{ p: 4 }}>
                <Grid container spacing={2}>

                    {/* Gender Repartition Chart */}
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6">Eleves</Typography>
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={genderData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    label
                                >
                                    <Cell fill="#0088FE" />
                                    <Cell fill="#FF8042" />
                                </Pie>
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </Paper>
                    </Grid>

                    {/* Attendance Chart */}
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" sx = {{paddingBottom : '2px'}}>Attendance</Typography>
                            <Box sx={{ width: 450 }}>
                                <BarChart width={300} height={300} data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                    <Bar dataKey="Present" fill="#82ca9d" />
                                    <Bar dataKey="Absent" fill="#FF8042" />
                                </BarChart>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Upcoming Events List */}
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6">Upcoming Events</Typography>
                            <List>
                                {events.map((event, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={event.title} secondary={event.date} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Behavior Analysis Chart */}
                    <Grid item xs={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6">Behavior Analysis</Typography>
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={behaviorData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    label
                                >
                                    <Cell fill="#82ca9d" />
                                    <Cell fill="#FF8042" />
                                </Pie>
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ClassroomOverview;
