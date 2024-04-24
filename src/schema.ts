import * as z from "zod";

export const createAppointmentSchema = z.object({
  body: z.object({
    doctorId: z.string({ required_error: "Doctor ID is required" }),
    patientFirstName: z.string({ required_error: "Patient first name is required" }),
    patientLastName: z.string({ required_error: "Patient last name is required" }),
    date: z
      .string({ required_error: "Date is required" })
      .date()
      .refine(
        (date) => {
          return date > new Date().toISOString().split("T")[0];
        },
        { message: "Date must be in the future" }
      ),
    time: z.string({ required_error: "Time is required" }).time({ message: "Time must be in HH:MM:SS[.s+] format" }),
    kind: z.enum(["New Patient", "Follow-up"], { required_error: "Kind is required. New Patient or Follow-up" }),
  }),
});

export const deleteAppointmentSchema = z.object({
  params: z.object({
    appointmentId: z.string({ required_error: "Appointment ID is required" }),
  }),
});

export const findAppointmentByDateSchema = z.object({
  params: z.object({
    date: z.string({ required_error: "Date is required" }).date("Date must be in YYYY-MM-DD format"),
  }),
});

export const findAppointmentByDoctorSchema = z.object({
  params: z.object({
    doctorId: z.string({ required_error: "Doctor ID is required" }),
  }),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
