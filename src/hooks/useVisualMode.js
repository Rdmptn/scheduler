import { useState } from "react"; 

//Exports the "mode" state to the app which controls the display
//of each interview appointment to its corresponding mode
export default function useVisualMode(initial) {
  const [mode, setMode] =  useState(initial);
  const history = [initial];
  
  //Sets the mode to the given value, and stores it in the array
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      history.pop();
    }
    history.push(newMode);
  }
   
  //Sets the mode to the previous value stored in the history array
  const back = function() {
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
  }
  
  return { mode, transition, back };
}
