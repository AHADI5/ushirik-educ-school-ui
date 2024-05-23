import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import instance from '../../services/axios';
import { v4 as uuidv4 } from 'uuid';
const localizer = momentLocalizer(moment);

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const SchoolCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [eventPlace, setEventPlace] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventId, setEventId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { schoolID } = useParams();

  // Fetch initial events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/v1/school/${schoolID}/events`);
        const fetchedEvents = response.data.map(event => ({
          id: event.eventID,
          title: event.title,
          start: new Date(event.startingDate),
          end: new Date(event.endingDate),
          place: event.place,
          description: event.description,
          color: event.color,
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        setError(error.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [schoolID]);

  const handleSelectSlot = ({ start, end }) => {
    setOpenDialog(true);
    setEventStart(start);
    setEventEnd(end);
  };

  const handleEventClick = (event) => {
    setOpenDialog(true);
    setEventTitle(event.title);
    setEventStart(new Date(event.start));
    setEventEnd(new Date(event.end));
    setEventPlace(event.place);
    setEventDescription(event.description);
    setEventId(event.id);
  };

  const handleSaveEvent = async () => {
    const newEvent = {
      eventID: eventId || uuidv4(),
      title: eventTitle,
      startingDate: moment(eventStart).format('YYYY-MM-DDTHH:mm:ss'),
      endingDate: moment(eventEnd).format('YYYY-MM-DDTHH:mm:ss'),
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
      place: eventPlace,
      description: eventDescription,
      color: randomColor()
    };

    setLoading(true);
    try {
      const response = await instance({
        method: eventId ? 'PUT' : 'POST',
        url: `/api/v1/school/${schoolID}/newEvent${eventId ? `/${eventId}` : ''}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: newEvent
      });

      const savedEvent = response.data;

      if (eventId) {
        setEvents(events.map(event => (event.id === eventId ? savedEvent : event)));
      } else {
        setEvents([...events, savedEvent]);
      }

      setOpenDialog(false);
      setEventTitle('');
      setEventStart(new Date());
      setEventEnd(new Date());
      setEventPlace('');
      setEventDescription('');
      setEventId(null);
    } catch (error) {
      setError(error.message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (eventId) {
      setLoading(true);
      try {
        await instance.delete(`/api/v1/school/${schoolID}/events/${eventId}`);
        setEvents(events.filter(event => event.id !== eventId));
        setOpenDialog(false);
        setEventTitle('');
        setEventStart(new Date());
        setEventEnd(new Date());
        setEventPlace('');
        setEventDescription('');
        setEventId(null);
      } catch (error) {
        setError(error.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="ml-48 mt-16">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSelectSlot}
          defaultView="month"
          views={['month', 'week', 'day']}
          style={{ height: '100vh' }}
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color }
          })}
        />
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div style={{ padding: 20 }}>
          <h2>{eventId ? 'Edit Event' : 'Add Event'}</h2>
          <TextField
            label="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            value={moment(eventStart).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setEventStart(moment(e.target.value).toDate())}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            value={moment(eventEnd).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setEventEnd(moment(e.target.value).toDate())}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Place"
            value={eventPlace}
            onChange={(e) => setEventPlace(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <div style={{ marginTop: 20 }}>
            <Button onClick={handleSaveEvent} variant="contained" color="primary" disabled={loading}>
              Save
            </Button>
            {eventId && (
              <Button onClick={handleDeleteEvent} variant="contained" color="secondary" style={{ marginLeft: 10 }} disabled={loading}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        message={error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default SchoolCalendar;
