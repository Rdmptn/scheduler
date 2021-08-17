import React from "react";
import useVisualMode from "hooks/useVisualMode.js";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
      
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
    
  function deleteAppointment(id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  
  function confirmDelete(id) {
    transition(CONFIRM);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            appointmentId={props.id}
            onEdit={() => transition(EDIT)}
            onDelete={(id) => confirmDelete(id)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={(name, interviewer) => save(name, interviewer)}
          />
        )}
        {mode === EDIT && (
          <Form 
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers} onCancel={() => back()}
            onSave={(name, interviewer) => save(name, interviewer)}
          />
        )}
        {mode === SAVING && <Status message="Saving..."/>}
        {mode === DELETING && <Status message="Deleting..."/>}
        {mode === CONFIRM && (
          <Confirm message="Are you sure you would like to delete?"
            appointmentId={props.id} 
            onCancel={() => back()}
            onConfirm={(id) => deleteAppointment(id)}
          />
        )}
        {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => back()} />}
        {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={() => back()} />}
    </article>
    );
}
