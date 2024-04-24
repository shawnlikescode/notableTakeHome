import type { Express } from "express";
import validate from "./middleware/validate";
import { createAppointmentSchema } from "./schema";
import {
  createAppointment,
  deleteAppointment,
  findAppointmentByDate,
  findAppointmentByDoctor,
} from "./appointments/appointments.controller";
import { getDoctors } from "./doctors/doctors.controller";

function routes(app: Express) {
  app.get("/doctors", getDoctors);

  app.get("/appointments/doctor/:doctorId/", findAppointmentByDoctor);

  app.get("/appointments/day/:date/", findAppointmentByDate);

  app.post("/appointments", validate(createAppointmentSchema), createAppointment);

  app.delete("/appointments/:appointmentId", deleteAppointment);
}

export default routes;
