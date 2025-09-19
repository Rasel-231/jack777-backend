import z from "zod";



const registerZodValidation = z.object({
    body: z.object({
        username: z.string({ required_error: "Username is required" }).regex(/^[a-z0-9]{4,}$/, "Username must be at least 4 characters and contain only lowercase letters and numbers"),
        password: z.string({ required_error: "password is required" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must be at least 6 characters long, include uppercase, lowercase, number, and special character"),
        fullname: z.string({ required_error: "Fullname is required" }),
        email: z.string({ required_error: "Email is required" }).email(),
        phone: z.string({ required_error: "Phone Number is required" }).regex(/^\+?\d{11}$/, "Invalid phone number"),
        dob: z.string({ required_error: "Date of birth is required" }).refine((val) => !isNaN(Date.parse(val)), { message: "Invalid Date formate" }),

    })
})

const loginZodValidation = z.object({
    body: z.object({
        username: z.string({ required_error: "Username is required" }).regex(/^[a-z0-9]{4,}$/, "Username must be at least 4 characters and contain only lowercase letters and numbers"),
        password: z.string({ required_error: "password is required" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must be at least 6 characters long, include uppercase, lowercase, number, and special character"),
    })
})
const passwordChangeZodValidation = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: "Old Password is Required" }),
        newPassword: z.string({ required_error: "New Password is Required" }),

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
    passwordChangeZodValidation,
    registerZodValidation
}