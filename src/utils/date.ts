import moment from "moment";

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  export  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    date.setHours(0, 0, 0, 0); 
    today.setHours(0, 0, 0, 0); 
  
    const dayDiff = Math.round((date - today) / (1000 * 60 * 60 * 24));
    
  
    if (dayDiff === 0) {
      return "Today";
    } else if (dayDiff === 1) {
      return "Tomorrow";
    } else if (dayDiff < 7 && dayDiff > 1) {
      return moment(dateString).format('dddd');
    }
    else {
      return moment(dateString).format('D MMMM, YYYY');
    }
  }