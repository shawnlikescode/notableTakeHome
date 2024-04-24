export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientFirstName: string;
  patientLastName: string;
  date: string;
  time: string;
  kind: "New Patient" | "Follow-up";
}
