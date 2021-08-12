import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []) 
  
  const getDayId = function(today, days) {
    let dayId;  
    for (let day of days) {
      if (day.name === today) {
        dayId = day.id - 1;
      }
    }
    return dayId;
  }
  
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
