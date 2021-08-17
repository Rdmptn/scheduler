import { useState, useEffect } from "react";
import axios from "axios";

//Grabs data from the api and sets the state for each day to the given data,
//and allows for creation, editing, or deletion of appointments
export default function useApplicationData(initial) {
  
  //Initial state before api request is made
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  //Api requests for 
  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []) 
  
  //Gets the id of the given day for later use
  const getDayId = function(today, days) {
    let dayId;  
    for (let day of days) {
      if (day.name === today) {
        dayId = day.id - 1;
      }
    }
    return dayId;
  }
  
  //Checks the amount of null interviews for a given day, and returns that value
  const updateSpots = function (dayId, days, appointments) {
    let nullCount = 0;
    let appointmentsForDay = days[dayId].appointments;
    for (let appointment of appointmentsForDay) {
      if (appointments[appointment].interview === null) {
        nullCount++;
      }
    }
    return nullCount;
  }
  
  //Edits an existing interview or creates a new one and adds it the api for the given id
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
   
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    let dayId = getDayId(state.day, state.days);
    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        state.appointments[id].interview = { interview }
        let spots = updateSpots(dayId, state.days, state.appointments);
        state.days[dayId].spots = spots;
        setState({
          ...state,
          appointments
        })
    }); 
  }
  
  
  //Deletes an existing interview appointment, changes the inteview state to null, and updates spots
  const cancelInterview = function(id) {
    
    let dayId = getDayId(state.day, state.days);
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        state.appointments[id].interview = null;
        let spots = updateSpots(dayId, state.days, state.appointments);
        state.days[dayId].spots = spots;
        setState({
          ...state
        })
      });
  }
  
  return { state, setDay, bookInterview, cancelInterview };
}
