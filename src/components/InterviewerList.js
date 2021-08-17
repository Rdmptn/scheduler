import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

export default function InterviewerList(props) {
  
  const interviewerData = props.interviewers;
  
  const displayInterviewers = interviewerData.map((interviewerData, index) => {
    return <InterviewerListItem key={interviewerData.id} id={interviewerData.id} name={interviewerData.name} 
            avatar={interviewerData.avatar} selected={interviewerData.id === props.value} 
            setInterviewer={props.setInterviewer}  />          
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{displayInterviewers}</ul>
    </section>
  );
}
