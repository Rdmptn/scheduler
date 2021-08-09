import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

// const appointments = [
  // {
    // id: 1,
    // time: "12pm",
  // },
  // {
    // id: 2,
    // time: "1pm",
    // interview: {
      // student: "Lydia Miller-Jones",
      // interviewer: {
        // id: 1,
        // name: "Sylvia Palmer",
        // avatar: "https://i.imgur.com/LpaY82x.png",
      // }
    // }
  // },
  // {
    // id: 3,
    // time: "2pm",
    // interview: {
      // student: "Yo",
      // interviewer: {
        // id: 2,
        // name: "Interview Man",
        // avatar: "https://i.imgur.com/twYrpay.jpg"
      // }
    // }
  // },
  // {
    // id: 4,
    // time: "3pm"
  // },
  // {
    // id: 5,
    // time: "4pm",
    // interview: {
      // student: "Student person",
      // interviewer: {
        // id: 3,
        // name: "Interviewer Person",
        // avatar: "https://i.imgur.com/Nmx0Qxo.png"
      // }
    // }
  // }
// ];


export default function Application(props) {
  
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
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const displayAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interview} 
      interviewers={interviewers}
      />
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {displayAppointments}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
