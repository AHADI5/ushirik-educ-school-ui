import React from 'react';
import { Box, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import dayjs from 'dayjs';

// Utility function to calculate percentage progress
const calculateProgress = (startDate, endDate) => {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const totalDuration = end.diff(start, 'day');
  const elapsedDuration = now.diff(start, 'day');
  const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);
  return progress;
};

// Styled component for highlights
const Highlight = styled('div')(({ theme, position }) => ({
  position: 'absolute',
  top: 0,
  left: `calc(${position}% - 5px)`,
  height: '100%',
  width: '10px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  transform: 'translateY(-50%)',
}));

const ProgressBarWithHighlights = ({ year }) => {
    const progress = calculateProgress(year.startDate, year.endDate);
  
    const getHighlightPosition = (date) => {
      const start = dayjs(year.startDate);
      const end = dayjs(year.endDate);
      if (!date) return 0; // Handle cases where date is not provided
      const durationFromStart = dayjs(date).diff(start, 'day');
      const totalDuration = end.diff(start, 'day');
      return (durationFromStart / totalDuration) * 100;
    };

    
    console.log("Current year ", )
  
    return (
      <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Progress: {progress.toFixed(0)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, position: 'relative' }}
        />
        {year.semestersList.map((semester, index) => (
          <Highlight
            key={`semester-${index}`}
            position={getHighlightPosition(semester.startingDate)}
            title={`Semestre ${index + 1} Start: ${dayjs(semester.startingDate).format('DD/MM/YYYY')}`}
          />
        ))}
        {year.semestersList.flatMap((semester, semesterIndex) =>
          semester.periodInSemesterList.map((period, periodIndex) => (
            <Highlight
              key={`period-${semesterIndex}-${periodIndex}`}
              position={getHighlightPosition(period.startingDate)}
              title={`Période ${periodIndex + 1} Start: ${dayjs(period.startingDate).format('DD/MM/YYYY')}`}
            />
          ))
        )}
      </Box>
    );
  };
  
export default ProgressBarWithHighlights;
