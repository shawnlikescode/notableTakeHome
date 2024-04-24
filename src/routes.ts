import type { Express } from "express";
import validate from "./middleware/validate";
import {
  createAppointmentSchema,
  deleteAppointmentSchema,
  findAppointmentByDateSchema,
  findAppointmentByDoctorSchema,
} from "./schema";
import {
  createAppointment,
  deleteAppointment,
  findAppointmentByDate,
  findAppointmentByDoctor,
} from "./appointments/appointments.controller";
import { getDoctors } from "./doctors/doctors.controller";

function routes(app: Express) {
  app.get("/doctors", getDoctors);

  app.get("/appointments/doctor/:doctorId/", validate(findAppointmentByDoctorSchema), findAppointmentByDoctor);

  app.get("/appointments/day/:date/", validate(findAppointmentByDateSchema), findAppointmentByDate);

  app.post("/appointments", validate(createAppointmentSchema), createAppointment);

  app.delete("/appointments/delete/:appointmentId", validate(deleteAppointmentSchema), deleteAppointment);
}

export default routes;
