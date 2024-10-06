import { z } from "zod";

const loginValidationSchema = z.object({
    email:z.string().trim().email("please input a valid email"),
    password:z.string().trim().min(6,"password must be 6 character")
})

export default loginValidationSchema