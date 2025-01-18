import { optional, z } from "zod";


// zod validator for NewUserRequestBody:
export const NewUserRequestBodyValidator = z.object({
    userName: z.string().optional(),
    phoneNumber: z.string().length(10),
    photo: z.string().optional(),
    gender: z.string(),
    dob: z.string().date()
});   