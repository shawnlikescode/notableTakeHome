import { faker } from "@faker-js/faker";
import type { Doctor, Appointment } from "./models";

function generateDoctors(count: number): Doctor[] {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: faker.string.nanoid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
  });
}

function generateAppointments(doctors: Doctor[], numberOfAppointments: number): Appointment[] {
  const appointments: Appointment[] = [];

  doctors.forEach((doctor) => {
    const appointmentTracker: Record<string, number> = {};
    for (let i = 0; i < numberOfAppointments; i++) {
      const date = faker.date.soon({ days: 30 }).toISOString().split("T")[0];
      const hours = faker.number.int({ min: 8, max: 16 });
      const minutes = [0, 15, 30, 45][faker.number.int({ min: 0, max: 3 })];
      const time = `${hours}:${minutes.toString().padStart(2, "0")}`;
      const kind: "New Patient" | "Follow-up" = faker.helpers.arrayElement(["New Patient", "Follow-up"]);

      const timeKey = `${date}T${time}`;
      if (appointmentTracker[timeKey] >= 3) continue;

      appointments.push({
        id: faker.string.nanoid(),
        doctorId: doctor.id,
        patientFirstName: faker.person.firstName(),
        patientLastName: faker.person.lastName(),
        date,
        time,
        kind,
      });

      appointmentTracker[timeKey] = (appointmentTracker[timeKey] || 0) + 1;
    }
  });
  return appointments;
}

const doctors = generateDoctors(3);
const appointments = generateAppointments(doctors, 4);

export { doctors, appointments };
