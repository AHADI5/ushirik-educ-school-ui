export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
  
    const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if(secondsPast < 60) {
      return `${secondsPast} seconds ago`;
    }
    if(secondsPast < 3600) {
      return `${Math.floor(secondsPast/60)} minutes ago`;
    }
    if(secondsPast <= 86400) {
      return `${Math.floor(secondsPast/3600)} hours ago`;
    }
    if(secondsPast > 86400) {
      let day = date.getDate();
      let month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      let year = date.getFullYear() == now.getFullYear() ? "" :  " "+date.getFullYear();
      return day + " " + month + year;
    }
  }
  