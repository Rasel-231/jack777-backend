import z from "zod";

const loginZodValidation = z.object({
    body: z.object({
        username: z.string({ required_error: "Username is Required" }),
        password: z.string({ required_error: "Password is Required" }),

    })
})

const refreshZodValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: "Refresh Token is Required" }),

    })
})



export const Authvalidation = {
    loginZodValidation,
    refreshZodValidation,
}