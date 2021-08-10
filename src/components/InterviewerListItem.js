import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  
  const displayName = function (selected, name) {
    if (selected) {
      return name;
    }
  }

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.id}
      />
      {displayName(props.selected, props.name)}
    </li>
    );

}
