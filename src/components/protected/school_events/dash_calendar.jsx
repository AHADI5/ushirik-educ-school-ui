import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import EventService from '../../../services/event_service';
const EventCalendar = () => {
  const param = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Function to format the date
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to fetch events by date
  const fetchEventsByDate = async (dateString) => {
    try {
      const eventData = await EventService.getEventByDate(param.schoolID, dateString);
      setEvents(eventData);
      console.log("Events for date ", dateString, ":", eventData);
    } catch (error) {
      console.error('Error fetching Event data:', error);
    }
  };

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    fetchEventsByDate(formattedDate); // Fetch events for the initial selected date
  }, [param.schoolID, selectedDate]); // Trigger fetch when schoolID or selectedDate changes

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-md mx-auto items-center rounded-md">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        style={{ height: 400 }}
      />
      <div className="mt-4">
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li className="pl-4 border-t-2" key={event.id}>{event.title} à {event.openingTime}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 pl-4 border-t-2">Pas d'événement prévu pour{selectedDate.toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
