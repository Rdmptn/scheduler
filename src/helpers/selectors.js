export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  for (let obj of state.days) {
    if (obj.name === day) {
      let appointmentDays = obj.appointments;
      for (let appointmentDay of appointmentDays) {
        appointmentsForDay.push(state.appointments[appointmentDay]);
        continue;
      }
    }
  }
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  
  if (interview === null) {
    return null;
  }

  let interviewerId = interview.interviewer;
  let interviewObject = {};
  interviewObject.student = interview.student;
  interviewObject.interviewer = state.interviewers[interviewerId];
  
  return interviewObject;
}