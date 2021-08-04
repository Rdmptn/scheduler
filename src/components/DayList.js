import React from "react";
import classnames from "classnames";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const  dayData  = props.days;
  
  const displayDays = dayData.map((dayData, index) => {
    return <DayListItem key={dayData.id} name={dayData.name} spots={dayData.spots} selected={dayData.name === props.day} setDay={props.setDay}  />          
  })
  
  return <ul>{displayDays}</ul>
}