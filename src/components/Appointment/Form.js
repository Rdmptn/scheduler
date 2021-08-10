import React, {useState} from "react";
import { action } from "@storybook/addon-actions";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  // const reset = function() {
    // setName("");
    // setInterviewer(null);
  // };
  
  // const cancel = function() {
    // reset();
    // return props.onCancel;
  // };
   
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            onChange={(event) => setName(event.target.value)}
            value={name}
            placeholder={"Please enter your name."}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={(event) => setInterviewer(event.target.alt)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}