import type { Request, Response } from "express";
import { doctors } from "../data";

export function getDoctors(req: Request, res: Response) {
  res.json(doctors);
}
