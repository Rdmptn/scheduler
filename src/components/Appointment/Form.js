import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null || isNaN(interviewer)) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  
  function cancel() {
    setName("");
    setInterviewer(null);
    props.onCancel();
  }
   
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={(event) => setInterviewer(Number(event.target.alt))} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}
