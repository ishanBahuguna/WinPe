import {  z } from "zod";

// zod validator for NewUserRequestBody:
export const NewUserRequestBodyValidator = z.object({
  phoneNumber: z.string().length(10),
  photo: z.string().optional(),
  gender: z.string(),
  dob: z.string().date(),
});

export const phoneNumberValidator = z
  .number()
  .refine((num) => num.toString.length === 10);
