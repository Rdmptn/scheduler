export default function getAppointmentsForDay(state, day) {
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
