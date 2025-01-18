"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUserRequestBodyValidator = void 0;
const zod_1 = require("zod");
// zod validator for NewUserRequestBody:
exports.NewUserRequestBodyValidator = zod_1.z.object({
    userName: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().length(10),
    photo: zod_1.z.string().optional(),
    gender: zod_1.z.string(),
    dob: zod_1.z.string().date()
});
