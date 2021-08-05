import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Yo",
      interviewer: {
        id: 2,
        name: "Interview Man",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Student person",
      interviewer: {
        id: 3,
        name: "Interviewer Person",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    const dayApiUrl = "/api/days";
    axios.get(dayApiUrl).then(response => {
      setDays(response.data);
    });
  }, [days])
  
  
  const displayAppointments = appointments.map((appointments, index) => {
    return <Appointment key={appointments.id} {...appointments} />
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
            days={days}
            day={day}
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
