import type { Request, Response } from "express";
import { appointments, doctors } from "../data";
import type { CreateAppointmentInput } from "../schema";
import type { Appointment } from "../models";
import { faker } from "@faker-js/faker";
import log from "../utils/logger";

export function findAppointmentByDoctor(req: Request<{ doctorId: string }>, res: Response) {
  const { doctorId } = req.params;
  const filteredAppointments = appointments.filter((a) => a.doctorId === doctorId);
  res.json(filteredAppointments);
}

export function findAppointmentByDate(req: Request<{ date: string }>, res: Response) {
  const { date } = req.params;
  const filteredAppointments = appointments.filter((a) => a.date === date);
  res.json(filteredAppointments);
}

export function createAppointment(req: Request<{}, {}, CreateAppointmentInput["body"]>, res: Response) {
  const { doctorId, patientFirstName, patientLastName, date, time, kind } = req.body;

  const doctorExist = doctors.find((d) => d.id === doctorId);

  if (!doctorExist) {
    log.error("Doctor not found");
    return res.status(400).json({ message: "Doctor does not exist" });
  }

  const [hours, minutes] = time.split(":").map(Number);
  if (hours < 0 || hours > 23 || minutes % 15 !== 0) {
    log.error("Invalid timeslot provide");
    return res.status(400).send("Invalid time. Appointments must start exactly on the hour or any 15 minute interval.");
  }

  const timeslotCount = appointments.filter(
    (a) => a.doctorId === doctorId && a.date === date && a.time === time
  ).length;

  if (timeslotCount >= 3) {
    log.error("Doctor has too many appointments at this time");
    return res.status(400).send("This doctor has too many appointments at this time. Please choose another time.");
  }

  const newAppointment: Appointment = {
    id: faker.string.nanoid(),
    doctorId: doctorExist.id,
    patientFirstName,
    patientLastName,
    date,
    time,
    kind,
  };

  appointments.push(newAppointment);
  log.info(`New appointment created for ${patientFirstName} ${patientLastName}`);
  res.status(201).json(newAppointment);
}

export function deleteAppointment(req: Request<{ appointmentId: string }, {}, {}, {}>, res: Response) {
  const { appointmentId } = req.params;
  const index = appointments.findIndex((a) => a.id === appointmentId);
  if (index === -1) {
    log.error(`Appointment with id ${appointmentId} not found`);
    return res.status(404).json({ message: "Appointment not found" });
  }

  appointments.splice(index, 1);
  log.info(`Appointment with id ${appointmentId} deleted`);
  return res.status(204).json({ message: "Appointment deleted" });
}
