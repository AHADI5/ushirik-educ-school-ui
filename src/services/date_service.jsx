// dateService.js

const DateService = {
    formatDate: (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      return date.toLocaleDateString('en-US', options);
    },
    
    // Add more date-related functions here as needed
  };
  
  export default DateService;
  