import React from "react";
import useVisualMode from "hooks/useVisualMode.js";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";


export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    props.bookInterview(props.id, interview);
    setTimeout(function(){transition(SHOW)}, 1100);
    
    
    
    // const myPromise = new Promise((resolve, reject) => {
      // props.bookInterview(props.id, interview);
      // if("complete") {
        // resolve("foo");
      // }
    // });
    
    // myPromise
      // .then(transition(SHOW), console.log("???"))
    };
    
  function deleteAppointment(id) {
    transition(DELETING);
    props.cancelInterview(id);
    setTimeout(function(){transition(EMPTY)}, 1100);
  }
  
  function confirmDelete(id) {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            appointmentId={props.id}
            onDelete={(id) => confirmDelete(id)}
          />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={(name, interviewer) => save(name, interviewer)} />}
        {mode === SAVING && <Status message="LOADING"/>}
        {mode === DELETING && <Status message="DELETING"/>}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" appointmentId={props.id} onCancel={() => back()} onConfirm={(id) => deleteAppointment(id)} />}
    </article>
    );
}