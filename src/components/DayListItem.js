import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining"; 
    } else {
      return `${spots} spots remaining`;
    }
  }
  
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2> 
      <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}