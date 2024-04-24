import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";

function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ error });
    }
  };
}

export default validate;
